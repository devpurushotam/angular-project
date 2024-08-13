$(document).ready(function () {
  const states = [
    {
      label: "Andaman & Nicobar Islands",
      value: "an",
      identifier: "an_k-12",
      key: "UT (Andaman and Nicobar Islands)",
    },
    {
      label: "Arunachal Pradesh",
      value: "ar",
      key: "State (Arunachal Pradesh)",
      identifier: "ar_k-12",
    },
    {
      label: "Andhra Pradesh",
      value: "apekx",
      name: "State (Andhra Pradesh)",
      identifier: "ap_k-12_1",
    },
    {
      label: "Assam",
      value: "as",
      name: "State (Assam)",
      identifier: "as_k-12",
    },
    {
      label: "Bihar",
      value: "br",
      name: "State (Bihar)",
      identifier: "br_k-12",
    },
    {
      label: "Chhattisgarh",
      value: "cg",
      name: "State (Chhattisgarh)",
      identifier: "cg_k-12",
    },
    {
      label: "Chandigarh",
      value: "ch",
      name: "State (Chandigarh)",
      identifier: "ch_k-12",
    },
    {
      label: "Delhi",
      value: "dl",
      name: "State (Delhi)",
      identifier: "dl_k-12_1",
    },
    {
      label: "Dadra And Nagar Haveli And Daman And Diu",
      value: "DD",
      name: "UT (DNH and DD)",
      identifier: "dd_k-12",
    },
    {
      label: "Goa",
      value: "ga",
      name: "State (Goa)",
      identifier: "ga_k-12",
    },
    {
      label: "Gujarat",
      value: "gj",
      name: "State (Gujarat)",
      identifier: "gj_k-12",
    },
    {
      label: "Himachal Pradesh",
      value: "hp",
      name: "State (Himachal Pradesh)",
      identifier: "hp_k-12",
    },
    {
      label: "Haryana",
      value: "hr",
      name: "State (Haryana)",
      identifier: "hr_k-12",
    },
    {
      label: "Jharkhand",
      value: "jh",
      name: "State (Jharkhand)",
      identifier: "jh_k-12",
    },
    {
      label: "Jammu And Kashmir",
      value: "jk",
      name: "State (Jammu And Kashmir)",
      identifier: "jk_k-12",
    },
    {
      label: "Karnataka",
      value: "ka",
      name: "State (Karnataka)",
      identifier: "ka_k-12",
    },
    {
      label: "Kerala",
      value: "kl",
      name: "State (Kerala)",
      identifier: "kl_k-12",
    },
    {
      label: "Ladakh",
      value: "ld",
      name: "UT (Ladakh)",
      identifier: "ld_k-12",
    },
    {
      label: "Lakshadweep",
      value: "lk",
      name: "UT (Lakshadweep)",
      identifier: "lk_k-12",
    },
    {
      label: "Maharashtra",
      value: "mitra",
      name: "State (Maharashtra)",
      identifier: "mh_k-12_1",
    },
    {
      label: "Meghalaya",
      value: "ml",
      name: "State (Meghalaya)",
      identifier: "ml_k-12",
    },
    {
      label: "Manipur",
      value: "mn",
      name: "State (Manipur)",
      identifier: "mn_k-12",
    },
    {
      label: "Madhya Pradesh",
      value: "mp",
      name: "State (Madhya Pradesh)",
      identifier: "mp_k-12",
    },
    {
      label: "Mizoram",
      value: "mz",
      name: "State (Mizoram)",
      identifier: "mz_k-12",
    },
    {
      label: "Nagaland",
      value: "nl",
      name: "State (Nagaland)",
      identifier: "nl_k-12",
    },
    {
      label: "Odisha",
      value: "od",
      name: "State (Odisha)",
      identifier: "od_k-12",
    },
    {
      label: "Punjab",
      value: "pb",
      name: "State (Punjab)",
      identifier: "pb_k-12",
    },
    {
      label: "Pondicherry",
      value: "py",
      name: "UT (Puducherry)",
      identifier: "py_k-12",
    },
    {
      label: "Rajasthan",
      value: "rj",
      name: "State (Rajasthan)",
      identifier: "rj_k-12",
    },
    {
      label: "Sikkim",
      value: "sk",
      name: "State (Sikkim)",
      identifier: "sk_k-12_1",
    },
    {
      label: "Tamil Nadu",
      value: "tn",
      name: "State (Tamil Nadu)",
      identifier: "tn_k-12_5",
    },
    {
      label: "Tripura",
      value: "tp",
      name: "State (Tripura)",
      identifier: "tp_k-12",
    },
    {
      label: "Telangana",
      value: "ts",
      name: "State (Telangana)",
      identifier: "ts_k-12",
    },
    {
      label: "Uttarakhand",
      value: "uk",
      name: "State (Uttarakhand)",
      identifier: "uk_k-12",
    },
    {
      label: "Uttar Pradesh",
      value: "up",
      name: "State (Uttar Pradesh)",
      identifier: "up_k-12",
    },
  ];

  const contentTypes = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Digital Textbook",
      value: "Digital Textbook",
    },
    {
      label: "Courses",
      value: "Courses",
    },
  ];

  const foundationalGradeLevels = [
    {
      label: "Pre-School Nursery",
      value: "Pre-School Nursery",
    },
    {
      label: "Pre-School L.K.G",
      value: "Pre-School L.K.G",
    },
    {
      label: "Pre-School U.K.G",
      value: "Pre-School U.K.G",
    },
    {
      label: "Class 1",
      value: "Class 1",
    },
    {
      label: "Class 2",
      value: "Class 2",
    },
  ];

  const preparatoryGradeLevels = [
    {
      label: "Class 3",
      value: "Class 3",
    },
    {
      label: "Class 4",
      value: "Class 4",
    },
    {
      label: "Class 5",
      value: "Class 5",
    },
  ];

  const midStageGradeLevels = [{
    label: "Class 6",
    value: "Class 6"
  },
  {
    label: "Class 7",
    value: "Class 7"
  },
  {
    label: "Class 8",
    value: "Class 8"
  }
];

const secStageGradeLevels = [{
    label: "Class 9",
    value: "Class 9"
  },
  {
    label: "Class 10",
    value: "Class 10"
  },
  {
    label: "Class 11",
    value: "Class 11"
  }, 
  {
    label: "Class 12",
    value: "Class 12"
  }
];

  let filterData = {};
  foundationalGradeLevels.forEach((element) => {
    $(".explore-grade-levels").append(
      '<option value="' + element.value + '">' + element.label + "</option>"
    );
  });

  preparatoryGradeLevels.forEach((element) => {
    $(".explore-foundation-grade-levels").append(
      '<option value="' + element.value + '">' + element.label + "</option>"
    );
  });

  midStageGradeLevels.forEach(element => {
    $('.explore-mid-stage-grade-levels').append('<option value="' + element.value + '">' + element.label + '</option>');
  });

  secStageGradeLevels.forEach(element => {
    $('.explore-sec-stage-grade-levels').append('<option value="' + element.value + '">' + element.label + '</option>');
  });

  contentTypes.forEach((element) => {
    $(".explore-content-type").append(
      '<option value="' + element.value + '">' + element.label + "</option>"
    );
  });

  let selected_stage ="";
  states.forEach((element) => {
    $(".state-boards").append(
      '<option value="' + element.value + '">' + element.label + "</option>"
    );
    $(".explore-state-boards").append(
      '<option value="' + element.name + '">' + element.label + "</option>"
    );
  });
  $(".explore-state-boards").on("change", function () {
    if ($(this).children("option:selected").val() != "Select State") {
      $(".explore-state-boards").attr(
        "selected-state",
        $(this).children("option:selected").val()
      );
    } else {
      $(".explore-state-boards").attr("selected-state", "#");
    }
    let state = $(this).attr("selected-state");
    if (state && state !== "#") {
        filterData.state = state;
    }
    fetchContents();
  });

  $(".explore-content-type").on("change", function () {
    if ($(this).children("option:selected").val() != "Select Content Type") {
      $(".explore-content-type").attr(
        "selected-contenttype",
        $(this).children("option:selected").val()
      );
    } else {
      $(".explore-content-type").attr("selected-contenttype", "#");
    }
    let state = $(this).attr("selected-contenttype");
    console.log("contenttype-->", state);
    if (state && state !== "#") {
        filterData = {...filterData, contentType : state};
    }
    fetchContents();
  });

  $(".explore-grade-levels").on("change", function () {
    if ($(this).children("option:selected").val() != "Select Grade") {
      $(".explore-grade-levels").attr(
        "selected-grade",
        $(this).children("option:selected").val()
      );
    } else {
      $(".explore-grade-levels").attr("selected-grade", "#");
    }
    let state = $(this).attr("selected-grade");
    if (state && state !== "#") {
        filterData = {...filterData, grade : state};
    }    
    fetchContents();
  });

  $(".explore-foundation-grade-levels").on("change", function () {
    if ($(this).children("option:selected").val() != "Select Grade") {
      $(".explore-foundation-grade-levels").attr(
        "selected-grade",
        $(this).children("option:selected").val()
      );
    } else {
      $(".explore-foundation-grade-levels").attr("selected-grade", "#");
    }
    let state = $(this).attr("selected-grade");
    if (state && state !== "#") {
        filterData = {...filterData, grade : state};
    }
    fetchContents();
  });

  $(".prep-stage").on("click", function () {
    console.log("stage wiill be changed to preparatory..", selected_stage)

    if(selected_stage != 'preparatory') {
        console.log("stage changed to preparatory..")
        filterData ={};
    }
    selected_stage = "preparatory";
  });

  $(".mid-stage").on("click", function () {
    console.log("stage will be changed to middle..", selected_stage)
    if(selected_stage != 'middle') {
        console.log("stage changed to middle..")
        filterData ={};
    }
    selected_stage = "middle";
  });

  $(".sec-stage").on("click", function () {
    console.log("stage will be changed to secondary..", selected_stage)

    if(selected_stage != 'secondary') {
        console.log("stage changed to secondary..")

        filterData ={};
    }
    selected_stage = "secondary";
  });

  $(".found-stage").on("click", function () {
    console.log("stage will be changed to fundation..", selected_stage)

    if(selected_stage != 'foundation') {
        console.log("stage changed to fundation..")
        filterData ={};
    }
    selected_stage = "foundation";
  });

  function fetchContents() {
    let selectedBoard, selectedContentType, selectedGrade;
    selectedBoard = filterData.state;
    selectedGrade = filterData.grade;
    selectedContentType = filterData.contentType;
    console.log("grade--->", filterData)
    const apiUrl =
      "https://dev.oci.diksha.gov.in/api/content/v1/search?orgdetails=orgName,email";
    // selectedContentType = localStorage.getItem("explore-contenttype");
    // selectedGrade = localStorage.getItem("explore-grade");
    // selectedBoard = localStorage.getItem("explore-state");
    console.log(
      "selectedContentType--/>",
      selectedContentType +
        "....selectedGrade---->" +
        selectedGrade +
        "....selectedBoard--->",
      selectedBoard
    );
    let category = [];
    let grade = [];
    let board = [];

    // Add to arrays only if the values are not empty or the default value
    if (
      selectedContentType &&
      selectedContentType !== "" &&
      selectedContentType !== "Select Content Type"
    ) {
      console.log(
        "type of selectedContentType--->",
        typeof selectedContentType
      );

      console.log("selectedContentType--->", selectedContentType);
      category.push(selectedContentType);
    }

    if (
      selectedGrade &&
      selectedGrade !== "" &&
      selectedGrade !== "Select Grade"
    ) {
      console.log("selectedGrade--->", selectedGrade);
      grade.push(selectedGrade);
    }

    if (
      selectedBoard &&
      selectedBoard !== "" &&
      selectedBoard !== "Select Board"
    ) {
      console.log("selectedBoard--->", selectedBoard);
      board.push(selectedBoard);
    }
    // Data to be sent in the POST request body
    const data = {
      request: {
        filters: {
          subject: [],
          audience: [],
          primaryCategory: category,
          se_boards: board,
          se_gradeLevels: grade,
          se_mediums: ["English"],
          // "channel":"01263350230999859261"
        },
        limit: 100,
        fields: [
          "name",
          "appIcon",
          "mimeType",
          "gradeLevel",
          "identifier",
          "medium",
          "pkgVersion",
          "board",
          "subject",
          "resourceType",
          "primaryCategory",
          "contentType",
          "channel",
          "organisation",
          "trackable",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels",
          "me_averageRating",
          "me_totalRatingsCount",
          "me_totalPlaySessionCount",
        ],
        facets: [
          "se_subjects",
          "me_averageRating",
          "me_totalRatingsCount",
          "me_totalPlaySessionCount",
        ],
      },
    };

    var settings = {
      url: "https://dev.oci.diksha.gov.in/api/content/v1/search?orgdetails=orgName%2Cemail",
      method: "POST",
      timeout: 0,
      headers: {
        Accept: "application/json",
        Connection: "keep-alive",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        request: {
          filters: {
            subject: [],
            audience: [],
            primaryCategory: category,
            se_boards: board,
            se_gradeLevels: grade,
            se_mediums: ["English"],
          },
          limit: 100,
          fields: [
            "name",
            "appIcon",
            "mimeType",
            "gradeLevel",
            "identifier",
            "medium",
            "pkgVersion",
            "board",
            "subject",
            "resourceType",
            "primaryCategory",
            "contentType",
            "channel",
            "organisation",
            "trackable",
            "se_boards",
            "se_subjects",
            "se_mediums",
            "se_gradeLevels",
            "me_averageRating",
            "me_totalRatingsCount",
            "me_totalPlaySessionCount",
          ],
          facets: [
            "se_subjects",
            "me_averageRating",
            "me_totalRatingsCount",
            "me_totalPlaySessionCount",
          ],
        },
      }),
    };

    $.ajax(settings)
      .done(function (response) {
        console.log("response-->", response);
        if (response.result.content) {
          let records = response.result.content.slice(0, 15);
          displayCards(records);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error: " + textStatus, errorThrown);
      });
  }

  function displayCards(data) {
    let stage = "";
    stage = selected_stage;
    var targetCarouselId, indicatorsId, itemsId;
    switch (stage) {
      case "foundation":
        targetCarouselId = "#foundStageCarousel";
        indicatorsId = "foundation-carousel-indicators";
        itemsId = "foundation-carousel-items";
        break;
      case "preparatory":
        targetCarouselId = "#prepStageCarousel";
        indicatorsId = "preparatory-carousel-indicators";
        itemsId = "preparatory-carousel-items";
        break;
        case "middle":
            targetCarouselId = '#midStageCarousel';
            indicatorsId = "middle-carousel-indicators";
            itemsId = "middle-carousel-items";
            break;
          case "secondary":
            targetCarouselId = '#secStageCarousel';
            indicatorsId = "secondary-carousel-indicators";
            itemsId = "secondary-carousel-items";
            break;
      default:
        targetCarouselId = "#foundStageCarousel"; // Default case if stage value is invalid
    }
    var slides = [],
      indicators = [],
      html = "",
      activeClass;
    data.forEach((item, index) => {
      // Set up the slide
      activeClass = index === 0 ? "active" : ""; // The first slide should have 'active' class

      let cardHtml = "";
      cardHtml = `
                <button onclick="redirectTpPortal('${item.se_boards[0]}','${item.se_gradeLevels[0]}', '${item.primaryCategory}')" style="border: none; background: none; padding: 0; margin: 0; width: 100%; text-align: left;">
                    <div class="carousel-item ${activeClass}" data-contenttype="${item.primaryCategory}" data-board="${item.se_boards[0]}" data-grade="${item.se_gradeLevels[0]}">
                        <div class="nistha-course-nav-link">
                        <div class="nistha-course-card">
                            <div class="book-image">
                            <img src="${item.appIcon}" alt="">
                            </div>
                            <div class="nistha-course-detail">
                            <div class="course-strip">
                                <div class="strip-wrap">
                                <span>
                                    <img src="../assets/homepage/nistha-lp/parents/book-icon.svg" alt="book">
                                </span>
                                <span class="strip-title">${item.primaryCategory}</span>
                                </div>
                            </div>
                            <div class="book-detail">
                                <span class="course-icon subject"><img src="../assets/homepage/nistha-lp/course/subject.svg" alt=""></span>
                                <span class="book-text">Subject: ${item.se_subjects[0]}</span>
                            </div>
                            <div class="course-title">
                                <h4 title="Parent Handbook Copy of Health & Physical Education"><bdi>${item.name}</bdi></h4>
                            </div>
                            <div class="bmc-detail">
                                <p class="board" title="CBSE">Board: ${item.se_boards[0]}</p>
                                <p class="medium" title="English">Medium: ${item.se_mediums[0]}</p>
                                <p class="grade" title="Class 9">${item.se_gradeLevels[0]}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </button>
              `;
      slides.push(cardHtml);
      // set up the indicator
      activeClass = index == 0 ? ' class="active" ' : ""; // see note about the active slide above- same goes for the indicators
      html = `<li data-bs-target="${targetCarouselId}" data-slide-to="${index}" ${activeClass}></li>`;
    //   console.log("indicators html---->", html);
      indicators.push(html);
      // $container.append(cardHtml);
    });
    document.getElementById(`${indicatorsId}`).innerHTML =
      indicators.join("");
    document.getElementById(`${itemsId}`).innerHTML = slides.join("");
    $(`${targetCarouselId}`).carousel();

    let parentstudyitems = document.querySelectorAll(
      ".parent-study-carousel .carousel-item"
    );
    parentstudyitems.forEach((el) => {
      const studyMinPerSlide = 3;
      let studynext = el.nextElementSibling;
      for (var parentstudy = 1; parentstudy < studyMinPerSlide; parentstudy++) {
        if (!studynext) {
          // wrap carousel by using first child
          studynext = parentstudyitems[0];
        }
        let cloneChild = studynext.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        studynext = studynext.nextElementSibling;
      }
    });
  }

  
});

function redirectTpPortal(state, grade, contentType){
    console.log("test-->");
    const url = `/explore?selectedTab=${encodeURIComponent(
        contentType
      )}&board=${encodeURIComponent(state)}&gradeLevel=${encodeURIComponent(
        grade
      )}`;
  
      console.log("url--->",url);
      // Redirect to the new page
      // window.location.href = url;
      window.open('/explore/', "_self");
      return false;
}

function yourFunction() {
    alert("clicked...");
}

