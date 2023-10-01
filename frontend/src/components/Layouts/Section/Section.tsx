interface Props {
  top?: React.ReactNode;
  header?: React.ReactNode;
  content?: React.ReactNode;
}

const Section = ({ top, header, content }: Props) => {
  return (
    <>
      <section className="flex flex-col border-solid border-divider h-screen">
        <section className="border border-divider h-32">{top}</section>
        <header className="border border-divider h-32">{header}</header>
        <section className="border border-divider h-full">{content}</section>
      </section>
    </>
  );
};

export default Section;
