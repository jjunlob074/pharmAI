import { db, MedicationReminder, lte } from 'astro:db';

export async function GET({ request }) {
  const now = new Date();
  const pastReminders = await db.select().from(MedicationReminder).where(lte(MedicationReminder.time, now));
  if (pastReminders.length > 0) {
    await db.delete(MedicationReminder).where(lte(MedicationReminder.time, now));
    return new Response(JSON.stringify({ reload: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify({ reload: false }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
