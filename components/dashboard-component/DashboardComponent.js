// import { useCurrentUser } from "@/hooks/index";
// import Link from "next/link";
// import router from "next/router";
import React, { useState } from "react";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});
export function DashboardComponent({ totalArtists, totalArts, totalSaleAmount, totalAdminAddress, barChartData, lineChartData }) {


	const [lineChart, setLineChart] = useState({
		series: [
			{
				name: "Sale",
				data: lineChartData.saleData
			},
			{
				name: "Minted",
				data: lineChartData.mintData
			}
		],
		options: {
			chart: {
				//   height: 350,
				type: 'line',
				dropShadow: {
					enabled: true,
					color: '#000',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.2
				},
				toolbar: {
					show: false
				}
			},
			colors: ['#0395FF', '#545454'],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth'
			},
			title: {
				text: '',
				align: 'left'
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				},
			},
			markers: {
				size: 1
			},
			xaxis: {
				categories: lineChartData.lables,
				title: {
					text: 'Month'
				}
			},
			yaxis: {
				title: {
					text: 'Total'
				},
				//   min: 5,
				//   max: 40
			},
			legend: {
				position: 'top',
				horizontalAlign: 'right',
				floating: true,
				offsetY: -25,
				offsetX: -5
			}
		}
	});
	const [barChart, setBarChart] = useState({
		series: [{ data: barChartData.data }],

		options: {
			chart: { type: "bar" },
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "55%",
					endingShape: "rounded",
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ["transparent"],
			},
			xaxis: {
				categories: barChartData.labels,
			},
			yaxis: {
				title: {
					// text: '$ (thousands)'
				},
			},
			fill: {
				opacity: 0.8
			},
			legend: {
				position: "top",
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val;
					},
				},
			},
		},
	});

	return (
		<>
			<div >
				<div class="container-fluid">

					<h1 class="app-page-title">Overview</h1>
					<div class="row g-4 mb-4">
						<div class="col-6 col-lg-3">
							<div class="app-card app-card-stat shadow-sm h-100">
								<div class="app-card-body p-3 p-lg-4">
									<h4 class="stats-type mb-1">Total Sales</h4>
									<div class="stats-figure">{totalSaleAmount} BXMI</div>
									<div class="stats-meta text-success">
										{/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
										</svg> 20% */}
									</div>
								</div>
								{/* <a class="app-card-link-mask" href="#"></a> */}
							</div>
						</div>

						<div class="col-6 col-lg-3">
							<div class="app-card app-card-stat shadow-sm h-100">
								<div class="app-card-body p-3 p-lg-4">
									<h4 class="stats-type mb-1">Total Minted</h4>
									<div class="stats-figure">{totalArts}</div>
									<div class="stats-meta text-success">
										{/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
										</svg> 5%  */}
									</div>
								</div>
								{/* <a class="app-card-link-mask" href="#"></a> */}
							</div>
						</div>
						<div class="col-6 col-lg-3">
							<div class="app-card app-card-stat shadow-sm h-100">
								<div class="app-card-body p-3 p-lg-4">
									<h4 class="stats-type mb-1">Total Artist</h4>
									<div class="stats-figure">{totalArtists}</div>
									{/* <div class="stats-meta">
										Open</div> */}
								</div>
								{/* <a class="app-card-link-mask" href="#"></a> */}
							</div>
						</div>
						<div class="col-6 col-lg-3">
							<div class="app-card app-card-stat shadow-sm h-100">
								<div class="app-card-body p-3 p-lg-4">
									<h4 class="stats-type mb-1">Approved Addresses</h4>
									<div class="stats-figure">{totalAdminAddress}</div>
									{/* <div class="stats-meta">New</div> */}
								</div>
								{/* <a class="app-card-link-mask" href="#"></a> */}
							</div>
						</div>
					</div>

					<div class="row g-4 mb-4">
						<div class="col-12 col-lg-6">
							<div class="app-card app-card-chart h-100 shadow-sm">
								<div class="app-card-header p-3">
									<div class="row justify-content-between align-items-center">
										<div class="col-auto">
											<h4 class="app-card-title">Sales & Minting</h4>
										</div>
										{/* <div class="col-auto">
											<div class="card-header-action">
												<a href="charts.html">More charts</a>
											</div>
										</div> */}
									</div>
								</div>
								<div class="app-card-body p-3 p-lg-4">
									{/* <div class="mb-3 d-flex">
										<select class="form-select form-select-sm ms-auto d-inline-flex w-auto">
											<option value="1" selected>This week</option>
											<option value="2">Today</option>
											<option value="3">This Month</option>
											<option value="3">This Year</option>
										</select>
									</div> */}
									<div class="chart-container">
										{/* <canvas id="canvas-linechart" ></canvas>
										 */}

										<ReactApexChart
											options={lineChart.options}
											series={lineChart.series}
											type="line"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-6">
							<div class="app-card app-card-chart h-100 shadow-sm">
								<div class="app-card-header p-3">
									<div class="row justify-content-between align-items-center">
										<div class="col-auto">
											<h4 class="app-card-title">Artists</h4>
										</div>
										{/* <div class="col-auto">
											<div class="card-header-action">
												<a href="charts.html">More charts</a>
											</div>
										</div> */}
									</div>
								</div>
								<div class="app-card-body p-3 p-lg-4">
									{/* <div class="mb-3 d-flex">
										<select class="form-select form-select-sm ms-auto d-inline-flex w-auto">
											<option value="1" selected>This week</option>
											<option value="2">Today</option>
											<option value="3">This Month</option>
											<option value="3">This Year</option>
										</select>
									</div> */}
									<div class="chart-container">
										{/* <canvas id="canvas-barchart" ></canvas> */}
										<ReactApexChart
											options={barChart.options}
											series={barChart.series}
											type="bar"
										/>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}

