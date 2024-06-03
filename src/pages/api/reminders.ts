import { db, MedicationReminder, lte } from 'astro:db';

export async function GET({ request }) {
  const now = new Date();
  const pastReminders = await db.select().from(MedicationReminder).where(lte(MedicationReminder.time, now));
  if (pastReminders.length > 0) {
    await db.delete(MedicationReminder).where(lte(MedicationReminder.time, now));
    const alertMessages = pastReminders.map(reminder => `Reminder that has expired: "${reminder.description}" - "${reminder.medication}"`);
    return new Response(JSON.stringify({ reload: true, alertMessages }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify({ reload: false, alertMessages: [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
