const OpenAI = require('openai');
const Stripe = require('stripe');
const Roast = require('../models/Roast');
const { generateMockRoast } = require('../utils/mockRoasts');

// Initialize OpenAI if API key is available
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Initialize Stripe if API key is available
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Generate a basic roast
exports.generateRoast = async (req, res) => {
  try {
    const { name, photoUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    let roastContent;
    
    // Use OpenAI if available, otherwise use mock data
    if (openai) {
      // Generate roast using OpenAI with more savage prompt
      const prompt = `Write a savage, brutal roast for someone named ${name}. Don't hold back - make it genuinely cutting and hilarious. Include specific personal attacks about their appearance, personality, or life choices. Aim to make people laugh but also wince. Limit to 3-4 sentences.`;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a ruthless roast comedian like Jeff Ross or Anthony Jeselnik who specializes in brutal, savage takedowns. Your roasts are cutting, specific, and sometimes shocking, but always funny. Don't be generic - be creative and specific with your insults." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.9, // Higher temperature for more creative and unpredictable outputs
      });

      roastContent = completion.choices[0].message.content.trim();
    } else {
      // Use mock data
      console.log('Using mock data for basic roast (OpenAI API key not provided)');
      roastContent = generateMockRoast(name, false);
    }

    // Save to database
    const roast = new Roast({
      name,
      photoUrl: photoUrl || '',
      roastContent,
      isPremium: false
    });

    await roast.save();

    res.status(200).json({
      success: true,
      data: {
        roast: roastContent,
        id: roast._id
      }
    });
  } catch (error) {
    console.error('Error generating roast:', error);
    res.status(500).json({
      success: false,
      error: 'Error generating roast'
    });
  }
};

// Generate a premium roast
exports.generatePremiumRoast = async (req, res) => {
  try {
    const { name, photoUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    let roastContent;
    
    // Use OpenAI if available, otherwise use mock data
    if (openai) {
      // Generate premium roast using OpenAI with even more savage prompt
      const prompt = `Write an absolutely brutal, no-holds-barred roast for someone named ${name}. Make it the most savage, cutting roast possible - the kind that would make a comedy club audience gasp before laughing. Be creative, specific, and ruthless. Limit to 4-5 sentences but make every word count.`;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",  // Using GPT-3.5-Turbo instead of GPT-4 to save costs
        messages: [
          { role: "system", content: "You are the most savage roast comedian in the world, combining the brutal honesty of Anthony Jeselnik with the creative insults of Jeff Ross and the shock value of Dave Attell. Your roasts are legendary for being both hilarious and devastatingly personal. You never use generic insults - you craft specific, creative takedowns that hit where it hurts while still being funny." },
          { role: "user", content: prompt }
        ],
        max_tokens: 200,
        temperature: 1.0, // Maximum temperature for most creative and unpredictable outputs
      });

      roastContent = completion.choices[0].message.content.trim();
    } else {
      // Use mock data
      console.log('Using mock data for premium roast (OpenAI API key not provided)');
      roastContent = generateMockRoast(name, true);
    }

    // Save to database
    const roast = new Roast({
      name,
      photoUrl: photoUrl || '',
      roastContent,
      isPremium: true,
      paymentId: req.body.paymentId
    });

    await roast.save();

    res.status(200).json({
      success: true,
      data: {
        roast: roastContent,
        id: roast._id
      }
    });
  } catch (error) {
    console.error('Error generating premium roast:', error);
    res.status(500).json({
      success: false,
      error: 'Error generating premium roast'
    });
  }
};

// Get a roast by ID
exports.getRoastById = async (req, res) => {
  try {
    const roast = await Roast.findById(req.params.id);
    
    if (!roast) {
      return res.status(404).json({
        success: false,
        error: 'Roast not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        name: roast.name,
        photoUrl: roast.photoUrl,
        roast: roast.roastContent,
        isPremium: roast.isPremium,
        createdAt: roast.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching roast:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching roast'
    });
  }
};

// Create a checkout session for premium roast
exports.createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe API key not configured'
      });
    }

    const { name, photoUrl } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Premium Roast',
              description: 'A premium, personalized roast just for you',
            },
            unit_amount: 499, // $4.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name)}&photoUrl=${encodeURIComponent(photoUrl || '')}`,
      cancel_url: `${process.env.FRONTEND_URL}/`,
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url
      }
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating checkout session'
    });
  }
};

// Handle Stripe webhook
exports.handleWebhook = async (req, res) => {
  // If Stripe is not initialized, just return a success response
  if (!stripe) {
    console.log('Skipping webhook processing (Stripe API key not provided)');
    return res.status(200).json({ received: true });
  }
  
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Generate premium roast with the payment info
    try {
      const { name, photoUrl } = session.metadata;
      
      let roastContent;
      
      if (openai) {
        // Use OpenAI if available
        const prompt = `Write a hilarious, spicy roast for someone named ${name}. Make it more creative and edgy than a standard roast, but still keep it in good fun. Limit to 4-5 sentences.`;
        
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // Using GPT-3.5-Turbo instead of GPT-4 to save costs
          messages: [
            { role: "system", content: "You are a professional roast comedian who specializes in clever, edgy humor. Make your roasts spicy and creative, but still in good fun." },
            { role: "user", content: prompt }
          ],
          max_tokens: 200,
          temperature: 0.9, // Slightly higher temperature for more creative outputs
        });
    
        roastContent = completion.choices[0].message.content.trim();
      } else {
        // Use mock data
        console.log('Using mock data for webhook premium roast (OpenAI API key not provided)');
        roastContent = generateMockRoast(name, true);
      }
  
      // Save to database
      const roast = new Roast({
        name,
        photoUrl: photoUrl || '',
        roastContent,
        isPremium: true,
        paymentId: session.id
      });
  
      await roast.save();
      
      console.log('Premium roast generated and saved after payment');
    } catch (error) {
      console.error('Error processing payment webhook:', error);
    }
  }

  res.status(200).json({ received: true });
}; 