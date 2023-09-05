import React, { memo } from "react";
import "./statistics.css";
import { DemoDualAxes, DemoPie } from "./statistics";

export const Statistics = memo(() => {
  return (
    <div className="statistic_box">
      <h1>Oqtepa Lavash haqida barcha hisobotlar </h1>
      <div class="wrapper_item">
        <div class="row">
          <div class="dashboard-stat red">
            <div class="visual">
              <i class="fa fa-usd"></i>
            </div>
            <div class="details">
              <div class="number">
                <span>312</span>
              </div>
              <div class="desc">Total Profit</div>
            </div>
          </div>
          <div class="dashboard-stat blue" href="#">
            <div class="visual">
              <i class="fa fa-bar-chart-o"></i>
            </div>
            <div class="details">
              <div class="number">
                <span>12.5</span>
              </div>
              <div class="desc">New Order</div>
            </div>
          </div>
          <div class="dashboard-stat hoki" href="#">
            <div class="visual">
              <i class="fa fa-credit-card"></i>
            </div>
            <div class="details">
              <div class="number">
                <span>+ 53%</span>
              </div>
              <div class="desc">Popularity</div>
            </div>
          </div>
          <div class="dashboard-stat purple" href="#">
            <div class="visual">
              <i class="fa fa-comments"></i>
            </div>
            <div class="details">
              <div class="number">
                <span>689</span>
              </div>
              <div class="desc">New Feedback</div>
            </div>
          </div>
        </div>
      </div>
      <div className="statistic_product">
        <DemoPie />
      </div>
      <div className="full_analystic">
        <DemoDualAxes />
      </div>
    </div>
  );
});
