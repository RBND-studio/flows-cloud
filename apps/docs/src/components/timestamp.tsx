export const Timestamp = ({ timestamp }: { timestamp: Date }): JSX.Element => {
  return (
    <>
      Last updated on{" "}
      <time dateTime={timestamp.toISOString()}>
        {timestamp.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    </>
  );
};
