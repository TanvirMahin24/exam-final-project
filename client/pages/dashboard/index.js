import { useRouter } from "next/router";
import { Button } from "primereact/button";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = ({ currentUser, data }) => {
  const router = useRouter();
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div id="features" className="py-4 px-8 mt-5 mx-0 ">
        <div className="grid justify-content-center">
          {data?.map((item) => (
            <div
              key={item.id}
              className="col-12 md:col-12 lg:col-3 p-0 lg:pb-5 mt-4 lg:mt-0 px-3"
            >
              <div
                style={{
                  height: "150",
                  padding: "2px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))",
                }}
              >
                <div
                  className="p-3 surface-card h-full"
                  style={{ borderRadius: "8px" }}
                >
                  <h5 className="mb-2 text-900">{item.ticket.title}</h5>
                  <div className="pt-3">
                    <Button
                      label="View"
                      onClick={() => router.push(`/orders/${item.id}`)}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async (ctx, client) => {
  const { data } = await client.get("/api/orders");

  return { data };
};

export default Dashboard;
