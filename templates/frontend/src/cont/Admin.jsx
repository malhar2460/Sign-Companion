import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import bg from '../bg.avif'
import axios from 'axios'
import logo from '../logo3.png'
// import jsPDF from 'jsPDF'
import './admin.css'
import appname from '../logo3.png'
// import appname from '../Ansh.png'
import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import the plugin
// import * as jsPDF from 'jspdf';
require('jspdf-autotable');


const Admin = () => {

  const [data, setData] = useState([]);
  const [head, sethead] = useState([]);

  const [sign, setsign] = useState(false)
  const [text, settext] = useState(false)
  const [speech, setspeech] = useState(false)
  const [contact, setcontact] = useState(false)
  const [user_d, setuser_d] = useState(false)

  const [selectedUser, setSelectedUser] = useState('User');
  const [selectedOption, setSelectedOption] = useState('Text to sign');
  const [selectedTime, setSelectedTime] = useState('Today');

  const location = useLocation()
  //   const navigate = useNavigate();
  const [uname, setusername] = useState('')


  const { user } = location.state || { user: 'Guest' }
  // const { authent } = location.state || { authent: 'not' };

  const authent = location?.state?.authent || 'not';
  const navigate = useNavigate();
  // if(location.state.authent == undefined)
  // {
  //   const {authent} = location.state.authent
  //   authent = 'not'
  // }
  // else
  // {
  //   const {authent} = location.state.authent
  // }

  // useEffect(() => {
  //   setusername(user);
  // }, [user]);

  useEffect(() => {
    if (location.state && location.state.user) {
      setusername(user);
    }
    totext()
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  useEffect(() => {
    // Fetch data from the backend based on the selected options
    fetchData(selectedOption);
  }, [selectedOption]);


  // const fetchData = (option) => {
  //   // Make the API request to fetch data from the backend
  //   // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
  //   axios
  //     .post('http://127.0.0.1:8000/dash/', { 'option':option}, { headers: { 'Content-Type': 'application/json' } })
  //     .then((response) => {
  //       // Update the data state with the fetched data
  //       setData(response.data.res);
  //       sethead(response.data.headers)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const tologin = () => {
    navigate('/login', { state: { user: user, authent: authent } });
  }

  if(localStorage.getItem('admin') == 'false')
  {
    tologin()    
  }
  else
  {
    // alert(localStorage.getItem('admin'))
  }

  const fetchData = async (option) => {
    try {
      // Make the API request to fetch data from the backend
      const response = await axios.post(
        'http://127.0.0.1:8000/dash/',
        { option: option },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Assuming the response structure is { res: [], headers: [] }
      const { res, headers } = response.data;

      // Update the data state with the fetched data
      setData(res);
      sethead(headers);
      setFilteredData(res)

      // console.log(response.data);
      // console.log(data.res)
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., show a user-friendly message or log the error
    }
  };


  const listItems = data.map((myList) =>
    <li>{myList}</li>
  );
  const tosign = () => {
    setsign(true)
    setcontact(false)
    settext(false)
    setspeech(false)
    setuser_d(false)
    setSelectedOption('sign_to_text_tbl')

  }


  const tocontact = () => {
    setsign(false)
    setcontact(true)
    settext(false)
    setspeech(false)
    setuser_d(false)
    setSelectedOption('contact_us_tbl')
  }

  const toabout = () => {
    setsign(false)
    setcontact(false)
    settext(false)
    setspeech(false)
    setuser_d(true)
    setSelectedOption('log_in_tbl')
  }
  const tohome = () => {

    navigate('/', { state: { user: user, authent: authent } });
  }


  const tospeech = () => {
    setsign(false)
    setcontact(false)
    settext(false)
    setspeech(true)
    setuser_d(false)
    setSelectedOption('speech_to_sign_tbl')
  }
  const totext = () => {
    setsign(false)
    setcontact(false)
    settext(true)
    setspeech(false)
    setuser_d(false)
    setSelectedOption('text_to_sign_tbl')
  }

  var [filteredData, setFilteredData] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value as needed
  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  // Slice data array to get items for current page
  // const currentPageData = data.slice(startIndex, endIndex);
  const currentPageData = filteredData.slice(startIndex, endIndex);
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //============================================
  // VARIABLES FOR TEXT TO SIGN
  //============================================
  const [text_2, settext_2] = useState('')
  const [text_id, settext_id] = useState("");
  const [user_id_2, setuser_id2] = useState("");
  const [t_date_2, sett_date_2] = useState("");
  //============================================
  //============================================
  // VARIABLES FOR SIGN TO TEXT
  //============================================
  const [image_id, setimage_id] = useState('')
  const [letter, setletter] = useState("");
  const [user_id_3, setuser_id3] = useState("");
  const [t_date_3, sett_date_3] = useState("");
  //============================================
  //============================================
  // VARIABLES FOR SPEECH TO SIGN
  //============================================
  const [transcript_id, settranscript_id] = useState('')
  const [transcript, settranscript] = useState("");
  const [user_id_4, setuser_id4] = useState("");
  const [t_date_4, sett_date_4] = useState("");
  //============================================
  // fname	lname	email	phone_num	message	submission_date
  //============================================
  // VARIABLES FOR CONTACT US
  //============================================
  const [email_id, setemail_id] = useState('')
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [msg, setmsg] = useState("");
  const [phone, setphone] = useState("");
  const [t_date_5, sett_date_5] = useState("");
  //============================================
  //============================================
  // VARIABLES FOR USER DETAILS
  //============================================ USER_ID	EMAIL	FNAME	LNAME	DOB	created_at
  const [email_id1, setemail_id1] = useState('')
  const [fname1, setfname1] = useState("");
  const [lname1, setlname1] = useState("");
  const [user_id_6, setuser_id6] = useState("");
  const [DOB, setDOB] = useState("");
  const [t_date_6, sett_date_6] = useState("");
  //============================================


  const [isChecked, setIsChecked] = useState(false);
  const [isFilterContainerVisible, setFilterContainerVisible] = useState(false);
  const handleFilterClick = () => {
    setFilterContainerVisible(true);
  };

  const handleFilterContainerClose = () => {
    setemail_id1("")
    setfname1("")
    setlname1("")
    setuser_id6("")
    setDOB("")
    sett_date_6("")
    setemail_id("")
    setfname("");
    setlname("");
    setmsg("");
    setphone("");
    sett_date_5("");
    settext_2("")
    settext_id("")
    setuser_id2("")
    sett_date_2("")
    setimage_id("")
    setletter("")
    setuser_id3("")
    sett_date_3("")
    settranscript_id("")
    settranscript("")
    setuser_id4("")
    sett_date_4("")
    setFilterContainerVisible(false);
  };
  // Step 2: Handle Change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [isnotnullChecked, setIsnotnullChecked] = useState(false);
  const handlenotnullCheckboxChange = (e) => {
    setIsnotnullChecked(e.target.checked);
  };
  const handleFilterChange = (filterType, rangeType, value) => {
    setFilters({
      ...filters,
      [filterType]: {
        ...filters[filterType],
        [rangeType]: value,
      },
    });
  };

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    setSortColumn(column);

    setFilteredData(prevData => {
      return prevData.slice().sort((a, b) => {
        const comparison = a[column] < b[column] ? -1 : 1;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    });

    // Toggle the sort order for the next click
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const [filters, setFilters] = useState({ // Define filters state variable
    startDate: { from: '', to: '' },
    completedDate: { from: '', to: '' },
    dueDate: { from: '', to: '' },
  });


  const handleExportPDF = (filteredRows, columnsToExport) => {
    if (!Array.isArray(filteredRows) || filteredRows.length === 0) {
      console.error("Filtered rows are undefined, null, or empty.");
      return;
    }
    if (selectedOption === "sign_to_text_tbl") {
      const unit = 'pt';
      const size = 'A4';
      const orientation = 'portrait';
      const marginLeft = 5;
      const doc = new jsPDF(orientation, unit, size, marginLeft);

      // Add dummy image placeholder
      const dummyImage = appname;

      // Calculate image position for centering
      const pageWidth = doc.internal.pageSize.width;
      const imageWidth = 400;
      const imageX = (pageWidth - imageWidth) / 2; // Center the image horizontally

      // Add image to the document
      const imageHeight = 50;
      const imageY = 40;
      doc.addImage(dummyImage, 'PNG', imageX, imageY, imageWidth, imageHeight);

      // Add text to the document
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      const text = selectedOption + " Details";
      const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const textX = (pageWidth - textWidth) / 2;
      doc.text(text, textX, 150);

      // Define table options
      const tableOptions = {
        startY: 200,
        headStyles: {
          fillColor: [0, 123, 255],
          textColor: 0,
          fontStyle: 'bold',
          halign: 'center',
          lineWidth: 1,
          lineColor: [0, 0, 0],
        },
        styles: {
          fontSize: 10,
          cellPadding: 8,
          lineWidth: 1,
          lineColor: [0, 0, 0],
        },
        bodyStyles: {
          textColor: 0,
          fontStyle: 'normal',
          halign: 'left',
          lineWidth: 1,
          lineColor: [0, 0, 0]
        },
      };

      // Extract row values from the header
      const rowValues = head.map(row => row[0]);

      // Extract column values
      const colValues = filteredRows.map(row => row.map((cell, index) => {
        // Check if the cell contains image data
        if (index === 2 && typeof cell === 'string') {
          // Convert the image data to a Data URL and render it in PDF
          const imageDataUrl = `data:image/jpeg;base64,${cell}`;
          return ''; // Empty string to avoid duplicate rendering of the image
        } else {
          return cell;
        }
      }));

      // Add the table to the PDF
      doc.autoTable(rowValues, colValues, tableOptions);

      // Save the PDF
      doc.save('Report.pdf');
    }

    else {

      const unit = 'pt';
      const size = 'A4';
      const orientation = 'portrait'; // Correct the orientation spelling
      const marginLeft = 5;
      const doc = new jsPDF(orientation, unit, size, marginLeft);

      // Dummy image placeholder
      const dummyImage = appname;

      // Image dimensions and position
      const imageWidth = 400;
      const imageHeight = 50;
      // Calculate the center of the page for the image
      const pageWidth = doc.internal.pageSize.width;
      const imageX = (pageWidth - imageWidth) / 2; // Center the image horizontally
      const imageY = 40;

      // Add image placeholder with specified dimensions
      doc.addImage(dummyImage, 'PNG', imageX, imageY, imageWidth, imageHeight);

      doc.setFontSize(24); // Font size in points
      doc.setFont("helvetica", "bold"); // Font family and style
      var text = selectedOption + " Details";
      // Calculate the width of the text
      var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

      // Calculate the center of the page for the text
      var x = (pageWidth - textWidth) / 2;

      // Add centered text to the document
      doc.text(text, x, 150);

      // Formatting options for the table
      const tableOptions = {
        startY: 200, // Adjust the starting Y position of the table
        headStyles: {
          //Header styles
          fillColor: [0, 123, 255],// Header color (ajeeb sa gold in this case)
          textColor: 0, // Header text color (black in this case)
          fontStyle: 'bold', // Header font style
          halign: 'center', // Header text alignment
          lineWidth: 1, // Header border width
          lineColor: [0, 0, 0], // Header border color (black in this case)
        },
        styles: {
          fontSize: 10, // Font size
          cellPadding: 8, // Cell padding
          lineWidth: 1, // Border width
          lineColor: [0, 0, 0], // Border color (black in this case)
        },
        bodyStyles: { // Body styles
          textColor: 0, // Body text color (black in this case)
          fontStyle: 'normal', // Body font style
          halign: 'left', // Body text alignment
          lineWidth: 1, // Body border width
          lineColor: [0, 0, 0] // Body border color (black in this case)
        },
      };

      // Table data
      const rowValues = []; // Array to store row values
      const rowValues1 = []; // Array to store row values

      head.forEach((row, index) => {
        rowValues.push(row);
      });
      // Iterate over the rowValues array to access each row value
      rowValues.forEach((rowValue, index) => {
        // Assuming each rowValue is an array with a single string element
        rowValues1.push(rowValue[0]); // Access the value from the rowValue array

        // console.log(`Value of row $?{index + 1}: ${value}`); // Log the value to the console
        // You can perform any other operations with the value here
      });
      const colValues = []; // Array to store col values
      const colValues1 = []; // Array to store col values

      currentPageData.forEach((cell, cellindex) => {
        colValues.push(cell);
      });
      let i = 0
      colValues.forEach((rowValue, index) => {
        colValues1.push(rowValue); // Access the value from the rowValue array
        i++
      });
      console.log(colValues1)
      const headersToExport = rowValues1; // Use 'head' instead of 'customHeaders'
      // const valuesToExport = filteredRows.map(row => headersToExport.map(col => row[col]));
      const valuesToExport = colValues1;

      // Add the table to the PDF
      doc.autoTable(headersToExport, valuesToExport, tableOptions); // Use 'headersToExport' instead of 'customHeaders'

      // Save the PDF
      doc.save('Report.pdf');

    }

  };


  const onFilterClick = () => {
    setFilteredData(data ? data.filter(item => {
      // const startDateMatch = isDateInRange(item.Start_Date, filters.startDate);

      // const completedDateMatch = isChecked
      //     ? item.completedDate === null : (isnotnullChecked
      //         ? !(item.completedDate === null) : isDateInRange(item.completedDate, filters.completedDate))
      //     ;
      // const dueDateMatch = isDateInRange(item.dueDate, filters.dueDate);

      if (selectedOption == 'sign_to_text_tbl') {
        let text_match = (letter !== '') ? item[3].toLowerCase().includes(letter.toLowerCase()) : true;

        let user_id_match = (user_id_3 !== '') ? (item[1] == user_id_3) : true;

        let text_id_match = (image_id !== '') ? (item[0] == image_id) : true;

        // let date_match = (t_date_2 !== '') ? item[3].toLowerCase().includes(t_date_2.toLowerCase()) : true;
        let date_match = (t_date_3 !== '') ? (item[4] == t_date_3) : true;

        console.log(item[3]);

        return text_match && user_id_match && text_id_match && date_match;
      }

      if (selectedOption == 'text_to_sign_tbl') {
        let text_match = (text_2 !== '') ? item[2].toLowerCase().includes(text_2.toLowerCase()) : true;

        let user_id_match = (user_id_2 !== '') ? (item[1] == user_id_2) : true;

        let text_id_match = (text_id !== '') ? (item[0] == text_id) : true;

        // let date_match = (t_date_2 !== '') ? item[3].toLowerCase().includes(t_date_2.toLowerCase()) : true;
        let date_match = (t_date_2 !== '') ? (item[3] == t_date_2) : true;

        console.log(item[3]);

        return text_match && user_id_match && text_id_match && date_match;
      }
      if (selectedOption == 'speech_to_sign_tbl') {
        let text_match = (transcript !== '') ? item[2].toLowerCase().includes(transcript.toLowerCase()) : true;

        let user_id_match = (user_id_4 !== '') ? (item[1] == user_id_4) : true;

        let text_id_match = (transcript_id !== '') ? (item[0] == transcript_id) : true;

        // let date_match = (t_date_2 !== '') ? item[3].toLowerCase().includes(t_date_2.toLowerCase()) : true;
        let date_match = (t_date_4 !== '') ? (item[3] == t_date_4) : true;

        console.log(item[3]);

        return text_match && user_id_match && text_id_match && date_match;
      }
      if (selectedOption == 'contact_us_tbl') {
        let text_match = (msg !== '') ? item[3].toLowerCase().includes(msg.toLowerCase()) : true;
        let text_match1 = (fname !== '') ? item[0].toLowerCase().includes(fname.toLowerCase()) : true;
        let text_match2 = (lname !== '') ? item[1].toLowerCase().includes(lname.toLowerCase()) : true;
        let text_match3 = (email_id !== '') ? item[2].toLowerCase().includes(email_id.toLowerCase()) : true;


        // let date_match = (t_date_2 !== '') ? item[3].toLowerCase().includes(t_date_2.toLowerCase()) : true;
        let date_match = (t_date_5 !== '') ? (item[5] == t_date_5) : true;
        let text_id_match = (phone !== '') ? (item[4] == phone) : true;

        console.log(item[3]);

        return text_match && text_match1 && text_match2 && text_match3 && text_id_match && date_match;
      }
      if (selectedOption == 'log_in_tbl') {
        //============================================ USER_ID	EMAIL	FNAME	LNAME	DOB	created_at
        // const [email_id1, setemail_id1] = useState('')
        // const [fname1, setfname1] = useState("");
        // const [lname1, setlname1] = useState("");
        // const [user_id_6, setuser_id6] = useState("");
        // const [DOB, setDOB] = useState("");
        // const [t_date_6, sett_date_6] = useState("");
        let text_match1 = (fname1 !== '') ? item[2].toLowerCase().includes(fname1.toLowerCase()) : true;
        let text_match2 = (lname1 !== '') ? item[3].toLowerCase().includes(lname1.toLowerCase()) : true;
        let text_match3 = (email_id1 !== '') ? item[1].toLowerCase().includes(email_id1.toLowerCase()) : true;


        // let date_match = (t_date_2 !== '') ? item[3].toLowerCase().includes(t_date_2.toLowerCase()) : true;
        let date_match = (t_date_6 !== '') ? (item[5] == t_date_6) : true;
        let text_id_match = (DOB !== '') ? (item[4] == DOB) : true;
        let text_id_match1 = (user_id_6 !== '') ? (item[0] == user_id_6) : true;

        console.log(item[3]);

        return text_match1 && text_match2 && text_match3 && text_id_match && text_id_match1 && date_match;
      }




    }) : []);
  }

  return (
    // <div className='min-h-screen ' style={{
    //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   backgroundAttachment: 'fixed' // Add this line to make the background fixed
    // }}
    // >

    <div className='min-h-screen bg-[#e9eaec]'>

      <nav className=' py-5 px-5 bg-white '>
        <div className='flex items-center justify-between'>
          <div>
            <button onClick={tohome} className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
          </div>
          <div className='hidden sm:flex lg:flex-row gap-7'>
            <a onClick={tosign}>
              <button className={`text-black ${sign === true ? 'border-b-2 border-black' : ''}    text-lg `}>Sign to Text</button>
            </a>

            <a onClick={totext}>
              <button className={`text-black ${text === true ? 'border-b-2 border-black' : ''}  text-lg `}>Text to Sign</button>
            </a>
            <a onClick={tospeech}>
              <button className={`text-black ${speech === true ? 'border-b-2 border-black' : ''} text-lg `}>Speech to Sign</button>
            </a>

            <a onClick={tocontact}>
              <button className={`text-black ${contact === true ? 'border-b-2 border-black' : ''}  text-lg `}>Contact us</button>
            </a>

            <a onClick={toabout}>
              <button className={`text-black ${user_d === true ? 'border-b-2 border-black' : ''} text-lg `}>User details</button>
            </a>

          </div>
          <div className='sm:hidden'>
            <button
              className='text-white  text-lg rounded-md'
              onClick={toggleDropdown}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>
      <button onClick={handleFilterClick} className="ml-[0%] mt-5 bg-blue-500 px-6 py-2 text-white rounded-lg text-xl">Filter</button>
      <button onClick={() => handleExportPDF(filteredData, head)} className="ml-[78%] mt-5 bg-blue-500 px-6 py-2 text-white rounded-lg text-xl">Download PDF</button>
      <div className=' outline-black mx-3 pt-0.5 mt-2 pb-5' >

        <div className='mt-4'>
        </div>

        {/* sign to text */}
        {isFilterContainerVisible && selectedOption == "sign_to_text_tbl" && (
          <div id="FilterContainer" className="filter-container h-[60%] fixed  inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            {/* <div id="FiterContainer" className="bg-white p-6 rounded-lg w-[100%]"> */}
            <a onClick={handleFilterContainerClose} className="absolute top-0 right-0 m-3 text-gray-600 cursor-pointer">Close</a>
            <br />
            <input
              placeholder='Image ID'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setimage_id(e.target.value)}
            />
            <br></br>
            <input
              placeholder='User ID'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setuser_id3(e.target.value)}
            />
            <br></br>
            <input
              placeholder='Letter'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setletter(e.target.value)}
            />
            <br></br>
            <input
              placeholder='Date(YYYY-MM-DD)'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => sett_date_3(e.target.value)}
            />
            <br></br>
            <button onClick={() => { onFilterClick(); }} className="all-button mt-4">Filter</button>
          </div>
          // </div>
        )}

        {/* Text to sign  */}
        {isFilterContainerVisible && selectedOption == "text_to_sign_tbl" && (
          <div id="FilterContainer" className="filter-container h-[60%] p-0 fixed flex-col inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* <div id="" className="bg-white p- rounded-lg w-[100%]"> */}
            <a onClick={handleFilterContainerClose} className="absolute top-0 right-0 m-3 p-2 text-gray-600 cursor-pointer">Close</a>
            <br />
            {/* <span className='text-xl mr-10'>Text:</span> */}
            <input
              placeholder='Text'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => settext_2(e.target.value)}
            />
            <br />
            <input
              placeholder='User ID'
              type="text"
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              value={filters.projectName}
              onChange={(e) => setuser_id2(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Text ID'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => settext_id(e.target.value)}
            />
            <br></br>

            <input
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              placeholder='Date(YYYY-MM-DD)'
              type="text"
              value={filters.projectName}
              onChange={(e) => sett_date_2(e.target.value)}
            />
            <br></br>
            <button onClick={() => { onFilterClick(); }} className="all-button mt-4">Filter</button>
          </div>
          // </div>
        )}
        {/* Speech to sign  */}
        {isFilterContainerVisible && selectedOption == "speech_to_sign_tbl" && (
          <div id="FilterContainer" className="filter-container h-[60%] fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            {/* <div id="FiterContainer" className="bg-white p-6 rounded-lg w-[100%]"> */}
            <a onClick={handleFilterContainerClose} className="absolute top-0 right-0 m-3 text-gray-600 cursor-pointer">Close</a>
            <br />

            <input
              placeholder='Transcript'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => settranscript(e.target.value)}
            />
            <br></br>

            <input

              placeholder='User ID'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setuser_id4(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Transcript ID'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => settranscript_id(e.target.value)}
            />
            <br></br>

            <input
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              placeholder='Date(YYYY-MM-DD)'
              type="text"
              value={filters.projectName}
              onChange={(e) => sett_date_4(e.target.value)}
            />
            <br></br>
            <button onClick={() => { onFilterClick(); }} className="all-button mt-4">Filter</button>
          </div>
          // </div>
        )}
        {/* Contact us */}
        {isFilterContainerVisible && selectedOption == "contact_us_tbl" && (
          <div id="FilterContainer" className="filter-container h-[65%] fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            {/* <div id="FiterContainer" className="bg-white p-6 rounded-lg w-[100%]"> */}
            <a onClick={handleFilterContainerClose} className="absolute top-0 right-0 m-3 text-gray-600 cursor-pointer">Close</a>
            <br />

            <input
              placeholder='First name'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setfname(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Last name'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setlname(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Email'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setemail_id(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Phone number'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setphone(e.target.value)}
            />
            <br></br>

            <input
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              placeholder='Date(YYYY-MM-DD)'
              type="text"
              value={filters.projectName}
              onChange={(e) => sett_date_5(e.target.value)}
            />
            <br></br>
            <button onClick={() => { onFilterClick(); }} className="all-button mt-4">Filter</button>
          </div>
          // </div>
        )}
        {isFilterContainerVisible && selectedOption == "log_in_tbl" && (
          <div id="FilterContainer" className="filter-container h-[65%] fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            {/* <div id="FiterContainer" className="bg-white p-6 rounded-lg w-[100%]"> */}
            <a onClick={handleFilterContainerClose} className="absolute top-0 right-0 m-3 text-gray-600 cursor-pointer">Close</a>
            <br />

            <input
              placeholder='First name'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setfname1(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Last name'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setlname1(e.target.value)}
            />
            <br></br>

            <input
              placeholder='Email'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setemail_id1(e.target.value)}
            />
            <br></br>

            <input
              placeholder='DOB(YYYY-MM-DD)'
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              type="text"
              value={filters.projectName}
              onChange={(e) => setDOB(e.target.value)}
            />
            <br></br>

            <input
              className='placeholder-slate-600 py-3 px-3  rounded-md  focus:outline focus:outline-2 w-[60%] top-0 focus:outline-blue-700'
              placeholder='Date(YYYY-MM-DD)'
              type="text"
              value={filters.projectName}
              onChange={(e) => sett_date_6(e.target.value)}
            />
            <br></br>
            <button onClick={() => { onFilterClick(); }} className="all-button mt-4">Filter</button>
          </div>
          // </div>
        )}

        <div className={`rounded-lg border border-gray-200 w-[90%] ml-[76px] scale-110 ${selectedOption === 'sign_to_text_tbl' ? 'mt-[%]' : ''}`}>
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 table-auto mt-5 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  {head.map((row, index) => (
                    <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{row}</th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentPageData.map((row, rowIndex) => {
                  let imagePrinted = false; // Flag to track if an image has been printed for this row

                  return (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {selectedOption === 'sign_to_text_tbl' && typeof cell === 'string' ? (
                            <div className=''>
                              {/* Check if an image has been printed for this row */}
                              {imagePrinted ? (
                                <div className=''>
                                  {cell}
                                </div>
                              ) : (
                                // Print the image and set the flag
                                <div className='ml-[300px]'>
                                  <img className='h-32 w-40' src={`data:image/jpeg;base64,${cell}`} alt={cell} />
                                  {imagePrinted = true}
                                </div>
                              )}
                            </div>
                          ) : (
                            // If it's not an image or 'sign_to_text' is not selected, print the cell data
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}


              </tbody>
            </table>
          </div>
          <div className="rounded-b-lg border-t border-gray-200 bg-white px-4 py-2">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 p-2"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>

              {/* Render pagination items here */}
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className=''>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-10 h-9 block rounded border ${currentPage === index + 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white'} text-center w- leading-8 `}
                  >
                    <p className='pb-5'>{index + 1}</p>
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 p-2"
                >
                  <span className="sr-only">Next Page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            </ol>
          </div>

        </div>







      </div>
    </div>

  )
}

export default Admin
