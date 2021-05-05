import { todoListOrSearchState } from "@/components/State";
import { useRecoilValue } from "recoil";
const CardTotal = () => {
  const todoListOrSearch = useRecoilValue(todoListOrSearchState);
  return (
    <div className="flex justify-center  min-w-full">
      <div className="bg-white py-4 w-2/5 px-4 shadow-xl rounded-lg my-4 mx-4 ">
        <div className=" items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Todos</p>
            <p className="text-5xl">{todoListOrSearch.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white py-4  w-2/5 px-4 shadow-xl rounded-lg my-4 mx-4 ">
        <div className=" items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Completed</p>
            <p className="text-5xl"> {todoListOrSearch.completed}</p>
          </div>
        </div>
      </div>
      <div className="bg-white py-4  w-2/5 px-4 shadow-xl rounded-lg my-4 mx-4 ">
        <div className=" items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Not Completed</p>
            <p className="text-5xl"> {todoListOrSearch.notCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTotal;
