const MovieMemoEdit = (props) => {
  console.log(props);
  const url = props.location.state.url;

  return (
    <section>
      <h2 className="heading-one center">YoutubeMemoEdit</h2>
      <div className="width-fifty section-container-narrow">
        <p>{url}</p>
      </div>
    </section>
  );
};

export default MovieMemoEdit;
