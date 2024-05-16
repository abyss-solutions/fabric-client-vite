import { useGetAllStructuresQuery } from "../../__generated__/hooks";
export const PlatformList = () => {
  const { data, error, loading } = useGetAllStructuresQuery({
    nextFetchPolicy: "no-cache",
  });
  const list = data?.allStructures;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Platform List</h1>
      {list && (
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      {error && (
        <>
          <h2>error</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </div>
  );
};
