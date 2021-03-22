import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

const callbacks = {};

// Get the Email From GitHub
// These callbacks allow us to modify the default behavior of NextAuth.
callbacks.signIn = async function signIn(user, account, metadata) {
  const emailRes = await fetch('https://api.github.com/user/emails', {
    headers: {
      // Here we get the GitHub accessToken and use that to fetch emails
      Authorization: `token ${account.accessToken}`,
    },
  });
  const emails = await emailRes.json();
  const primaryEmail = emails.find((e) => e.primary).email;

  user.email = primaryEmail;
};

const options = {
  providers,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
