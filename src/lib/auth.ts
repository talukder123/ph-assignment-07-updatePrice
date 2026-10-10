import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { Resend } from 'resend';

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bajar-dor-price-update");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({

    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Verify your email',
                html: `<p>Hi ${user.name},</p>
              <p>Welcome to Bajar Dor! Please verify your email by clicking the button below.</p>
  <p>
    <a href="${url}" style="background:#15803d;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;">
      Verify email
    </a>
  </p>
  <p>This link will expire in 10 minutes. If you didn't create an account, you can ignore this email.</p>
  <p>Thanks,<br/>The Bajar Dor Team</p>`
            });
        },
        sendOnSignIn: true,
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 60 * 10
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});