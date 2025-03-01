// Mock roasts for when OpenAI API is not available
const basicMockRoasts = [
  "NAME looks like they were assembled from spare parts found in a discount bin at a thrift store. Their fashion sense screams 'I gave up on life' and their personality has all the depth of a puddle in the Sahara.",
  "If mediocrity had a poster child, it would be NAME. Their life achievements could fit on a Post-it note with room to spare. Even their own shadow looks embarrassed to be associated with them.",
  "NAME is living proof that evolution can go in reverse. Their IQ is lower than their shoe size, and their personality is about as appealing as week-old sushi left in the sun.",
  "I've seen more charisma in a cardboard cutout than NAME has in their entire body. They're so boring that insomniacs use their Instagram as a sleep aid.",
  "NAME is what happens when you order a personality from Wish.com. They're so generic that facial recognition software categorizes them as 'background extra'.",
  "NAME has the charm of a wet sock and the appeal of gas station sushi. Their personality is so bland it makes unseasoned tofu seem spicy by comparison.",
  "NAME is so irrelevant that even their FBI agent stopped watching them out of boredom. Their existence is the human equivalent of the color beige.",
  "NAME's face looks like it was designed by someone who heard about human features but never actually saw them. Their personality has all the complexity of a stick figure drawing.",
  "NAME is what happens when you hit 'randomize' on the character creation screen and then select 'no personality' as a trait. Even their own mother has to check their name tag occasionally.",
  "If disappointment needed a mascot, NAME would be on the shortlist. They have the ambition of a sloth and the charisma of a traffic cone."
];

const premiumMockRoasts = [
  "NAME is what you'd get if failure and disappointment had a baby and then dropped it on its head repeatedly. Their face looks like it was designed by an AI that was fed nothing but images of potatoes, and their personality has all the depth and complexity of a kiddie pool filled with mud. The most interesting thing about NAME is the collection of stains on their favorite shirt.",
  "I've seen more talent in a gas station bathroom than NAME has in their entire body. Their career aspirations have the trajectory of a brick thrown into a well, and their dating history reads like a cautionary tale they should tell in schools. NAME's idea of intellectual conversation is debating which flavor of ramen noodles is superior while living in their parents' basement at 35.",
  "NAME is so forgettable that their own diary entries start with 'Dear whoever this belongs to.' Their face has all the distinguishing features of unbuttered toast, and their personality makes watching paint dry seem like an extreme sport. NAME's greatest achievement to date is managing to dress themselves in the morning without adult supervision, though the results suggest they might need it.",
  "NAME is living proof that God sometimes just hits the 'randomize' button and walks away. Their face looks like it was assembled from mismatched parts found in a discount bin, and their fashion sense screams 'I was dressed by feral raccoons.' NAME's attempts at humor are so painful that they've been classified as a form of psychological torture by the Geneva Convention.",
  "NAME has the charisma of a damp towel and the sex appeal of a tax audit. Their idea of a personality is repeating quotes from shows they don't understand, and their laugh sounds like a donkey being strangled by a kazoo. NAME's dating profile is so sad that dating apps created a special algorithm just to hide it from potential matches out of mercy.",
  "If mediocrity had a poster child, it would reject NAME for not meeting the minimum standards. Their face has all the appeal of a week-old sandwich found under a couch, and their personality could be outshined by a particularly dull rock. NAME's parents still introduce them as 'our other child' and keep their photos in the back of the family album.",
  "NAME is what happens when the universe wants to make a joke but runs out of good material. Their face looks like it was designed by someone who heard about human features but never actually saw them. NAME's career aspirations have all the ambition of a sloth on tranquilizers, and their love life is so barren it qualifies as a protected desert ecosystem.",
  "NAME is so basic that pH scales use them as a reference point. Their personality is a bland smoothie of borrowed opinions and regurgitated TikTok trends. NAME's idea of adventure is trying a different flavor of La Croix, and their most passionate relationship is with their phone charger. Even their own reflection looks bored when they check themselves out.",
  "NAME looks like they were created when God was on a tight deadline and just said 'fuck it, ship it.' Their face has all the symmetry of a Picasso painting during an earthquake, and their body appears to be actively fighting against any attempt at fitness. NAME's personality is so non-existent that ghost hunters have more luck finding spirits than anyone has finding a single original thought in their head.",
  "NAME is what you'd get if you asked AI to generate a human with no redeeming qualities. Their face is a masterclass in asymmetry, and their body looks like it's been storing food for several consecutive apocalypses. NAME's idea of intellectual discourse is arguing about fast food chains, and their dating history reads like a series of hostage situations where Stockholm syndrome was the best outcome."
];

// Function to generate a mock roast
const generateMockRoast = (name, isPremium = false) => {
  const roasts = isPremium ? premiumMockRoasts : basicMockRoasts;
  const randomIndex = Math.floor(Math.random() * roasts.length);
  return roasts[randomIndex].replace(/NAME/g, name);
};

module.exports = {
  generateMockRoast
}; 