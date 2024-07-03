# Crowd Comic Website
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that uses [Bootstrap](https://getbootstrap.com/) for styling and animation.

## Getting Started

1. Install all dependencies using ```npm i```
2. Run the development server with ```npm run dev```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Things to Note

Use ```npm run lint``` or ```npm run lint:fix``` to check code before committing
These also run during a push and pull request

## Adding Google Fonts

1. Add in the desired font to the ```import { } from "next/font/google";``` in layout.tsx
2. Under the creating font variables section, create a const variable and add [font arguments](https://nextjs.org/docs/app/api-reference/components/font) like seen here (note that the only argument entirely necessary is variable as it will be used in CSS, please use the convention of ```--font-ex-name```)
```
const cevicheOne = Ceviche_One({
  subsets: ["latin"],
  weight:'400',
  display: 'swap',
  variable: '--font-ceviche-one'
});
```
3. Add in ```${fontVarName.variable}``` to the html's property className in layout.tsx's RootLayout's return
4. In the CSS file, please add the variable name for reference under     
```
       /* font variables:
        Inter: --font-inter
        Ceviche One: --font-ceviche-one
        Comic Neue: --font-comic-neue
         */
```

If using a local font instead of a Google font, please reference [Next.js's documentation for font optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts).

## CSS Guidelines

1. Import .css files as module.css files in their corresponding components or pages (.tsx)
2. Add styles to each element through string interpolation ex. {`${styles.body}`}
3. Add additional styling, such as Bootstrap CSS through string literals ex. {`card`}

#  Additional Info #
CSS Modules do not accept hyphenated class or id names, so opt for camel case instead
CSS Modules only accept pure selectors, meaning each selector has to be a class or id, denoted by . and #, respectfully

## Learn More

To learn more about Next.js and/or Bootstrap, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Bootstrap Documentation](https://getbootstrap.com/docs) - learn about Bootstrap features
