import { lucia } from "~/auth";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";
export async function POST(context: APIContext): Promise<Response> {
  //read the form data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  //validate the data
  if (typeof username !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/signin?message=Incorrect username'
      }
    });
  }
  if (typeof password !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/signin?message=Incorrect password'
      }
    });
  }

  //search the user
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);

  if (!foundUser) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/signin?message=Incorrect username'
      }
    });
  }
  

  // verify if user has password
  if (!foundUser.password) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/signin?message=Incorrect password'
      }
    });
  }

  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );

  //If password is not valid
  if (!validPassword) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/signin?message=Incorrect password'
      }
    });
  }

  //Password is valid, user can log in

  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/");
}
