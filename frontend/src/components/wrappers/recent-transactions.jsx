import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5"; // Updated import
import { RiProgress3Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";

import { Link } from "react-router-dom";

import { formatCurrency } from "../../libs";
import Title from "./title";

const RecentTransactions = ({ data }) => {
  return (
    <div className="flex-1 w-full py-20">
      {/* Title Section */}
      <div className="flex items-center justify-between">
        <Title title="Latest Transactions" />
        <Link
          to="/transactions"
          className="text-sm text-gray-600 dark:text-gray-500 hover:text-violet-680 hover:underline mr-5"
        >
          View All
        </Link>
      </div>

      {/* Transactions Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full">
          <thead className="w-full border-b border-gray-300 dark:border-gray-700">
            <tr className="w-full text-left text-black dark:text-gray-400">
              <th className="py-2">Date</th>
              <th className="px-2 py-2">Description</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2">{transaction.date}</td>
                <td className="px-2 py-2">{transaction.description}</td>
                <td className="px-2 py-2">
                  {transaction.status === "completed" ? (
                    <IoCheckmarkDoneCircle className="text-green-500" />
                  ) : transaction.status === "pending" ? (
                    <RiProgress3Line className="text-yellow-500" />
                  ) : (
                    <TiWarning className="text-red-500" />
                  )}
                </td>
                <td className="px-2 py-2">
                  {transaction.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;