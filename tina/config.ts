import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "author",
        label: "Authors",
        path: "src/content/authors",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
        ],
      },
      {
        name: "article",
        label: "Articles",
        path: "src/content/articles",
        defaultItem: () => {
          return {
            featured: false,
            date: new Date().toISOString(),
            author: "src/content/authors/eva.json",
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
            required: true,
          },
          {
            type: "reference",
            name: "author",
            label: "Author Name",
            collections: ["author"],
            ui: {
              optionComponent: (props) => {
                return props.name;
              },
            },
            required: true,
          },
          {
            type: "image",
            name: "imageSrc",
            label: "Featured Image",
            required: true,
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Alt Text for Featured Image",
            description: "Describe the image",
            required: true,
          },
          {
            type: "datetime",
            name: "creationDate",
            label: "Published Date",
            required: true,
          },
          {
            type: "datetime",
            name: "updateDate",
            label: "Last Update",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags",
              min: 1,
            },
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Article",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
