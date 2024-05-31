import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config

// Definir tabla de usuarios
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }),
  },
});

// Definir tabla de sesiones
const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

// Definir tabla de recordatorios de medicación
const MedicationReminder = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }), // Autoincremental
    userId: column.text({ optional: false, references: () => User.columns.id }), // Referencia a User
    description: column.text(),
    medication: column.text(),
    time: column.date(),
  }
});

// Exportar la configuración de la base de datos
export default defineDb({
  tables: {
    User,
    Session,
    MedicationReminder,
  },
});
