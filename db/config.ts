import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config
const MedicationReminder = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }), // Autoincremental
    description: column.text(),
    medication: column.text(),
    time: column.date(),
  }
});

export default defineDb({
  tables: { MedicationReminder },
});