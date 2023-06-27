type PlaList = {
  listItems: { [key: string]: string }[];
  toggle: () => void;
};

export default function PlaceList({ listItems, toggle }: PlaList) {
  return (
    <>
      {listItems.map((item) => (
        <button
          key={item.id}
          className="py-3 md:py-6 px-5 border-t-2 border-zinc-600 cursor-pointer"
          onClick={toggle}
          type="button"
        >
          <div className="text-base md:text-xl pb-1 ">{item?.place_name}</div>
          <div className="text-xs md:text-sm pb-1">{item?.address_name}</div>
          <div className="text-xs md:text-sm text-zinc-400">{item?.phone}</div>
        </button>
      ))}
    </>
  );
}
