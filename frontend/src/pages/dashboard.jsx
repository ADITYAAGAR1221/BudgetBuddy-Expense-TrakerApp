import React, { useEffect, useState } from "react";
import api from "../libs/apiCall.js";
import Loading from "../components/wrappers/loading.jsx";
import Info from "../components/wrappers/info.jsx";
import Stats from "../components/wrappers/stats.jsx";
import { toast } from "react-toastify"; // Ensure toast is imported
import { Chart } from "../components/wrappers/chart.jsx";
import DoughnutChart from "../components/wrappers/doughtnutchart.jsx";
import RecentTransactions from "../components/wrappers/recent-transactions.jsx";

const Dashboard = () => {
  const [data, setData] = useState([]); // Fixed typo: setbata -> setData
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardStats = async () => {
    const URL = "/transaction/dashboard";
    
    try {
      const response = await api.get(URL); // Fixed destructuring of API response
      setData(response.data);
    }
     catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 
        "Something unexpected happened. Try again later."
      );
      if (error?.response?.data?.status === "auth_failed") {
        localStorage.removeItem("user");
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDashboardStats();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Loading />
      </div>
    );

  return( <div className="px-0 md:px-5 2xl:px-20">
      <Info title="Dashboard" subTitle="Monitor your financial activities" />
      <Stats
        dt={{
          balance: data?.availableBalance,
          income: data?.totalIncome,
          expense: data?.totalExpense,
        }}
      />
<div className="flex flex-col-reverse items-center gap-10 w-full md:flex-row">
        <Chart data={data?.chartData} />
        {data?.totalIncome > 0 && (
          <DoughnutChart
            dt={{
              balance : data?.availableBalance,
              income : data?.totalIncome,
              expense : data?.totalExpense,
            }}
          />
        )}
      </div>
      <div className="flex flex-col-reverse gap-0 md:flex-row md:gap-10 2xl:gap-20">
        <RecentTransactions data={data?.lastTransactions}/>
        {data?.lastAccount?.length > 0 && <Accounts data={data?.lastAccount} />}
      </div>
    </div>
  );
};

  
export default Dashboard;