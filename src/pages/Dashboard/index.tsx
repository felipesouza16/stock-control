import { useQuery } from "@apollo/client";
import { Header } from "../../components/Header";
import { Stats } from "../../components/Stats";
import { RadialChart } from "react-vis";
import { READ_ALL_PRODUCTS } from "../../lib/query";
import { Product } from "../../types";
import { useEffect, useState } from "react";
import { getColorByName } from "../../utils/javascript";
import { useLocation } from "react-router-dom";

interface ChartType {
  angle: number;
  radius?: number;
  label?: string;
  subLabel?: string;
  color?: string;
  style?: Object;
  className?: string;
  padAngle?: number | VoidFunction;
}

const MIN_WIDTH = 500;

export const Dashboard = () => {
  const [dataChart, setDataChart] = useState<ChartType[]>([]);
  const location = useLocation();

  const { data: productData, refetch } = useQuery(READ_ALL_PRODUCTS, {
    onCompleted: (data) => {
      data.readAllProducts?.forEach((prod: Product, _: number) => {
        setDataChart((previous) => [
          ...previous,
          {
            angle: prod?.quantity ?? 0,
            label:
              String(prod?.name).length > 10
                ? String(prod?.name).slice(0, 10) + "..."
                : prod?.name,
            color: getColorByName(prod?.name || ""),
          },
        ]);
      });
    },
  });

  useEffect(() => {
    if (location.state === "true") {
      setDataChart([]);
      refetch();
      return;
    }
  }, []);

  const totalPrice = productData?.readAllProducts.reduce(
    (prev: number, obj: Product) => prev + Number(obj?.price),
    0
  );

  console.log(window.innerWidth);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex w-[90%] lg:flex-row flex-col justify-center gap-x-8">
        <div className="lg:w-1/5">
          <Stats data={productData?.readAllProducts} />
        </div>
        <div className="flex flex-col justify-center lg:w-3/5">
          <div className="flex justify-end">
            <div
              className="tooltip tooltip-left"
              data-tip="Representation of the quantity of each respective product."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center">
            <RadialChart
              data={dataChart}
              width={window.innerWidth >= MIN_WIDTH ? 400 : 300}
              height={500}
              showLabels
              colorType="literal"
              labelsStyle={{
                fontSize: "12px",
                fill: "hsl(var(--bc) / 0.6)",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/5">
          <div className="stats bg-base-300 shadow">
            <div className="stat">
              <div className="stat-title">Total stock price</div>
              <div className="stat-value">${totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
