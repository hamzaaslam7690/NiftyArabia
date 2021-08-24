
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import router from "next/router";
import { Navbar } from "../../components/layout/Navbar";


export default function AdminAddress({ posts }) {
  const [user, { mutate }] = useCurrentUser();

  useEffect(() => {
    if (user === null) router.replace('/login')
  }, [user])

  // delete address 
  const deleteAddress = async (id) =>{
const body =  id
    const res = await fetch(
      `${process.env.Baseurl}/api/admin/adminaddress`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({_id:id}),
      }
    );

    if(res.status === 200){
      window.location.reload();
    }
  

  }
  return (
  
    <>
	{user != null && (
		<>
			<Navbar />

			<div>
		
		<div class="app-content">
		<div class="container-fluid">
			
			<div class="row g-3 mb-4 align-items-center justify-content-between">
				<div class="col-auto">
					<h1 class="app-page-title mb-0">Address</h1>
				</div>
				<div class="col-auto">
					 <div class="page-utilities">
						<div class="row g-2 justify-content-start justify-content-md-end align-items-center">
							<div class="col-auto">
								{/* <form class="table-search-form row gx-1 align-items-center">
									<div class="col-auto">
										<input type="text" id="search-orders" name="searchorders" class="form-control search-orders" placeholder="Search" />
									</div>
									<div class="col-auto">
										<button type="submit" class="btn app-btn-secondary">Search</button>
									</div>
						
	
								</form> */}
								
							</div>
							<div class="col-auto">
								
								{/* <select class="form-select w-auto" >
									  <option selected value="option-1">All</option>
									  <option value="option-2">This week</option>
									  <option value="option-3">This month</option>
									  <option value="option-4">Last 3 months</option>
									  
								</select> */}
							</div>
							<div class="col-auto">
									<button class="btn app-btn-secondary"><Link href='/adminaddress/creation'>Create Admin Address</Link></button>
									</div>
							{/* <div class="col-auto">						    
								<a class="btn app-btn-secondary" href="#">
									<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	  <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
	  <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
	</svg>
									Download CSV
								</a>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		   
			
			{/* <nav id="orders-table-tab" class="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
				<a class="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</a>
				<a class="flex-sm-fill text-sm-center nav-link"  id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">Paid</a>
				<a class="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">Pending</a>
				<a class="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</a>
			</nav> */}
			
			
			<div class="app-card app-card-orders-table mb-5">
						<div class="app-card-body">
							<div class="table-responsive">
								
								<table class="table mb-0 text-left">
									<thead>
									
										<tr>
											<th class="cell">ID</th>
											<th class="cell">Public Address</th>
											<th class="cell">Action</th>
											{/* <th class="cell"></th> */}
										</tr>
									</thead>
									<tbody>
								
										{posts &&  !!posts.length &&
										posts.map((data, i) =>(
											<tr>
											<td class="cell">{data._id}</td>
											<td class="cell"><span class="truncate">{data.PublicAddress}</span></td>
											{/* <td class="cell">$259.35</td> */}
											<td class="cell">
												<a class="btn-sm app-btn-secondary" href="" onClick={()=>{deleteAddress(data._id)}}>Delete</a> 
												</td>
										</tr>
										)) }
									
									</tbody>
								</table>
								
	
						
				
							</div>
						</div>		
					</div>
	
			
			
		</div>
	</div>
				
		</div>
		</>
	)
	}

     
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.Baseurl}/api/admin/adminaddress`;
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: { posts },
  };
}
