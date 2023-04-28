import { useQuery } from "@apollo/client";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { GET_ME } from "../../lib/query";
import { Stats } from "../../components/Stats";
import { RadialChart } from "react-vis";

export const Dashboard = () => {
  const myData = [{ angle: 12 }, { angle: 5 }, { angle: 2 }];

  return (
    <div>
      <Header />
      <Stats />
      <RadialChart data={myData} width={90} height={90} />
    </div>
  );
};
