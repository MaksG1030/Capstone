const Ajv = require('ajv');

// Define the schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    race: { type: 'string', enum: ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling'] },
    class: { type: 'string', enum: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'] },
    level: { type: 'integer', minimum: 1 },
    alignment: { type: 'string', enum: ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'Neutral Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'] },
    background: { type: 'string' },
    abilities: {
      type: 'object',
      properties: {
        strength: { type: 'integer', minimum: 1, maximum: 20 },
        dexterity: { type: 'integer', minimum: 1, maximum: 20 },
        constitution: { type: 'integer', minimum: 1, maximum: 20 },
        intelligence: { type: 'integer', minimum: 1, maximum: 20 },
        wisdom: { type: 'integer', minimum: 1, maximum: 20 },
        charisma: { type: 'integer', minimum: 1, maximum: 20 }
      },
      required: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
    },
    hitPoints: { type: 'integer', minimum: 1 },
    armorClass: { type: 'integer', minimum: 1 },
    skills: {
      type: 'object',
      properties: {
        acrobatics: { type: 'integer', minimum: 0 },
        athletics: { type: 'integer', minimum: 0 },
        deception: { type: 'integer', minimum: 0 },
        history: { type: 'integer', minimum: 0 },
        insight: { type: 'integer', minimum: 0 },
        intimidation: { type: 'integer', minimum: 0 },
        investigation: { type: 'integer', minimum: 0 },
        medicine: { type: 'integer', minimum: 0 },
        nature: { type: 'integer', minimum: 0 },
        perception: { type: 'integer', minimum: 0 },
        performance: { type: 'integer', minimum: 0 },
        persuasion: { type: 'integer', minimum: 0 },
        religion: { type: 'integer', minimum: 0 },
        sleightOfHand: { type: 'integer', minimum: 0 },
        stealth: { type: 'integer', minimum: 0 },
        survival: { type: 'integer', minimum: 0 }
      }
    },
    equipment: { type: 'array', items: { type: 'string' } },
    spells: { type: 'array', items: { type: 'string' } },
    // Add more properties as needed
  },
  required: ['name', 'race', 'class', 'level', 'alignment', 'abilities', 'hitPoints', 'armorClass', 'skills']
};

// Initialize Ajv instance
const ajv = new Ajv({ allErrors: true });

// Compile the schema
const validate = ajv.compile(schema);

// Function to validate user data against the schema
const userData = (data) => {
  const valid = validate(data);
  if (!valid) {
    return { isValid: false, errors: validate.errors };
  }
  return { isValid: true, data };
};

module.exports = userData;