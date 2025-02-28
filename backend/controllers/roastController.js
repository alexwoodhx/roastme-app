const OpenAI = require('openai');
const Roast = require('../models/Roast');

// Initialize OpenAI and Stripe with dummy functionality if keys aren't provided
let openai;
let stripe;

// Check if OpenAI API key is provided
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Check if Stripe secret key is provided
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'your_stripe_secret_key') {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// Mock roast generator function
const generateMockRoast = (name, isPremium = false) => {
  const basicRoasts = [
    `${name}, your fashion sense is as outdated as Internet Explorer. But hey, at least you're consistent!`,
    `They say ${name} is a jack of all trades, master of none. But let's be honest, you're more like a jack of no trades.`,
    `${name}, you're like a human version of Monday morning - nobody's excited to see you, but they tolerate your existence.`,
    `${name}'s cooking is so bad, even the smoke detector cheers them on.`,
    `${name} is proof that evolution can go in reverse.`
  ];
  
  const premiumRoasts = [
    `${name}, your personality has the depth of a kiddie pool and the warmth of Antarctic waters. People don't actually leave the room when you enter; they were just planning their escape since you texted you were "on the way."`,
    `${name} is the human equivalent of a participation trophy. Not terrible enough to throw away, but nothing anyone would proudly display either. Your parents probably have your photo in their wallet... behind their Costco membership card.`,
    `I heard ${name} once inspired a new cologne: "Mediocrity - For When You've Given Up." It smells like broken dreams and your studio apartment that still has IKEA furniture from college. The commercial would just be you swiping right on dating apps while eating microwaved dinner.`,
    `${name} has the charisma of a wet paper towel and the ambition of a sloth on vacation. Your LinkedIn profile is basically a digital shrine to jobs you were barely qualified for but somehow talked your way into.`,
    `If ${name} was a spice, they'd be flour. If they were a book, they'd be the terms and conditions. If they were a movie, they'd be the credits. Not the end credits with the blooper reel - the opening ones that everyone skips.`
  ];
  
  const roasts = isPremium ? premiumRoasts : basicRoasts;
  return roasts[Math.floor(Math.random() * roasts.length)];
};

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
      // Generate roast using OpenAI
      const prompt = `Write a funny, light-hearted roast for someone named ${name}. Keep it humorous but not mean-spirited. Limit to 3-4 sentences.`;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a witty comedian who specializes in light-hearted roasts." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7,
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
      // Generate premium roast using OpenAI
      const prompt = `Write a hilarious, spicy roast for someone named ${name}. Make it more creative and edgy than a standard roast, but still keep it in good fun. Limit to 4-5 sentences.`;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",  // Using GPT-3.5-Turbo instead of GPT-4 to save costs
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

// Create a checkout session for premium roast
exports.createCheckoutSession = async (req, res) => {
  try {
    const { name, photoUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Instead of creating a real checkout session, redirect to the success page
    // to show the "coming soon" message
    const successUrl = `${process.env.FRONTEND_URL}/success`;
    
    console.log('Premium roasts marked as coming soon - redirecting to success page');
    
    return res.status(200).json({
      success: true,
      url: successUrl,
      message: 'Premium roasts coming soon'
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