# 🚀 Getting started

Before you begin setting up Strapi, ensure you have the necessary accounts and configurations in place.

## AWS Setup

1. **Create an AWS Account**:

   - Sign up for an account on [Amazon Web Services (AWS)](https://aws.amazon.com/).

2. **Set Up S3 Bucket**:

   - Go to the S3 service in AWS and create a bucket with ACL enabled.

3. **IAM Configuration**:

   - In IAM (Identity and Access Management), create a new policy with permissions for the S3 service.
   - Select all actions for S3 and define the resource bucket ARN as `{bucketname}` with any object.
   - Save the policy and attach it to a new user.

4. **Access Credentials**:

   - Once the user is created, obtain the access key and secret access key.
   - Save these credentials securely as they are required for Strapi configuration.

   ## 📝 Reminder:

Save these credentials securely as they are required for Strapi configuration.

## Strapi Configuration

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

1. **Configure Strapi with S3**:

   - In the Strapi admin panel, navigate to Plugins > AWS S3.
   - Follow the instructions to set up S3 integration.
   - Create a `.env` file based on the provided `env.example` and include the AWS credentials.

2. **Activate CORS**:

   - Under `config/middleware`, enable CORS to allow cross-origin requests for uploading images.

3. **Start Strapi**:
   - Use the provided CLI commands to start your Strapi application.

## Stripe Account

Before enabling shopping features, ensure you have an account with Stripe.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

For detailed instructions on Strapi setup and usage, refer to the official documentation and community resources provided below.

Feel free to check out the Strapi GitHub repository. Your feedback and contributions are welcome!

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<small style="position: absolute; bottom: 0; right: 0;">Gama1992!</small>
