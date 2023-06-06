import { Product } from "../../types";

interface StatsProps {
  data?: Product[];
}

export const Stats = ({ data }: StatsProps) => {
  const worstProduct = data?.reduce((prev, obj) => {
    if (Number(obj.quantity) < Number(prev.quantity)) {
      return obj;
    }
    return prev;
  });

  return (
    <div className="flex justify-center items-center h-[88vh]">
      <div className="stats stats-vertical bg-base-300 shadow">
        <div className="stat">
          <div className="stat-title">Quantity of products</div>
          <div className="stat-value">{data?.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Last product</div>
          <div className="stat-value">
            {data && data[data.length - 1]?.name}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Menor numero no estoque</div>
          <div className="stat-value">{worstProduct?.quantity}</div>
          <div className="stat-desc">↘︎ ({worstProduct?.name})</div>
        </div>
      </div>
    </div>
  );
};