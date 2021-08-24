import React, { useEffect, useState } from "react";
import { Navbar } from "../layout/Navbar";
import Pagination from "@/components/Paginate/Paginate";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";

const AllUser = ({ users,totalRecord, handleChange, form }) => {
  const [total, setTotal] = useState(totalRecord);
	const [currentPage, setCurrentPage] = useState(1);
	const [userPerPage] = useState(10);
	const indexOflastPost = currentPage * userPerPage;
	const indexOfFirstPost = indexOflastPost - userPerPage;
	const [usersPaginated, setpostsPaginated] = useState(users);
	const [filterArray, setfilterArray] = useState([]);
  const [search, setSearch] = useState('')
	const [user, { mutate }] = useCurrentUser();
	useEffect(() => {
		if (user === null) router.replace('/login')
	}, [user])
	const paginate = (e,pageNumber) => {
    e.preventDefault();
    fetch(`${process.env.Baseurl}/api/admin/artist?limit=${userPerPage}&skip=${pageNumber}&search=${search}`)
    .then(async (res) => {
      let { artists, totalRecord } = await res.json();
      setpostsPaginated(artists);
      setTotal(totalRecord)
    })
    .catch((err) => {
      console.log(err);
    });
		//setCurrentPage(pageNumber);
	};
	const previous = (e) => {
		if (currentPage > 1) {
			let number = currentPage - 1;
      paginate(number)
			setCurrentPage(e,number);
		}
	};
	const next = (e) => {
		let totalpage = total / userPerPage;
		if (currentPage < Math.ceil(totalpage)) {
			let number = currentPage + 1;
      paginate(e,number)
			setCurrentPage(number);
		}
	};
	// useEffect(() => {
	// 	fetch(`${process.env.Baseurl}/api/admin/artist?limit=${userPerPage}&skip=${currentPage}&search=${search}`)
	// 		.then(async (res) => {
	// 			let { artists, totalRecord } = await res.json();
	// 			setpostsPaginated(artists);
  //       setTotal(totalRecord)
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});

	// 	//  console.log("Paginations",currentPage)
	// }, [currentPage]);
  return (
    <>
      <Navbar />
      <div class="app-content">
        <div class="container-fluid">
          <div class="row g-3 mb-4 align-items-center justify-content-between">
            <div class="col-auto">
              <h1 class="app-page-title mb-0">All Users</h1>
            </div>
         
          <div class="col-auto">
										<div class="page-utilities">
											<div class="row g-2 justify-content-start justify-content-md-end align-items-center">
												 <div class="col-auto">
								    <form class="table-search-form row gx-1 align-items-center">
					                    <div class="col-auto">
					                        <input type="text" id="search-orders" name="search" class="form-control search-orders" placeholder="Search"  onChange={(e)=>setSearch(e.target.value)}/>
					                    </div>
					                    <div class="col-auto">
					                        <button type="button " class="btn app-btn-secondary" onClick={(e)=>{paginate(e,1)}}>Search</button>
					                    </div>
					                </form>
					                
							    </div>
							    {/* <div class="col-auto">
								    
								    <select class="form-select w-auto" >
										  <option selected value="option-1">All</option>
										  <option value="option-2">This week</option>
										  <option value="option-3">This month</option>
										  <option value="option-4">Last 3 months</option>
										  
									</select>
							    </div>  */}
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
                      <th class="cell">Name</th>
                      <th class="cell">Public Address</th>
                      <th class="cell">Description</th>
                      <th class="cell">Minted</th>
                      <th class="cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersPaginated &&
                      usersPaginated.map((data, index) => (
                        <tr>
                          <td class="cell">{data.ArtistName}</td>
                          <td class="cell">
                            <span class= "d-inline-block text-truncate" style={{"max-width": "150px"}}>{data.PublicAddress}</span>
                          </td>
                          <td class="cell">{data.Description}</td>
                          <td class="cell">{data.totalMinted}</td>
                          {/* <td class="cell">
                            <div class="form-check form-switch mb-3">
                              <form>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="block"
                                  name="block"
                                  onChange={()=>{handleChange()}}
                                  
                                />
                              </form>
                            </div>{" "}
                          </td> */}
                          <td class="cell">
                          <span class="btn-sm app-btn-secondary"> <Link href={`/users/details/${data._id}`} as={`/users/details/${data._id}`}>View </Link></span>{" "}  
                          <span class="btn-sm app-btn-secondary"><Link href={`/users/edit/${data._id}`} as={`/users/edit/${data._id}`}>Edit </Link></span> 
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
           
          </div>
          <Pagination
									postsPerPage={userPerPage}
									totalPosts={total}
									paginate={paginate}
									previous={previous}
									next={next}
								/>
        </div>
      </div>
    </>
  );
};

export default AllUser;
