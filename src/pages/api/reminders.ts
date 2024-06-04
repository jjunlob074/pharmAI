import { db, MedicationReminder, lte, eq, and } from 'astro:db';

export async function GET({ locals }) {
  const user = locals.user;
  const now = new Date();

  if (!user) {
    return new Response(JSON.stringify({ reload: false, alertMessages: [] }), { headers: { 'Content-Type': 'application/json' } });
  }

  const pastReminders = await db.select()
    .from(MedicationReminder)
    .where(and(eq(MedicationReminder.userId, user.id), lte(MedicationReminder.time, now)));

  if (pastReminders.length > 0) {
    await db.delete(MedicationReminder).where(and(eq(MedicationReminder.userId, user.id), lte(MedicationReminder.time, now)));
    const alertMessages = pastReminders.map(reminder => `Reminder that has expired: "${reminder.description}" - "${reminder.medication}"`);
    return new Response(JSON.stringify({ reload: true, alertMessages }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ reload: false, alertMessages: [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
