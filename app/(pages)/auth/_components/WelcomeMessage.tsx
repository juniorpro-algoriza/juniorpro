interface WelcomeMessageProps {
  content: string;
}

export const WelcomeMessage = ({ content }: WelcomeMessageProps) => (
  <h2 className='text-2xl font-medium text-midnight tracking-wider'>
    {content}
  </h2>
);
