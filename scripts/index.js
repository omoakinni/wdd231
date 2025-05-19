// Course data
const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
      technology: ['HTML', 'CSS'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'Students become more organized, efficient, and powerful programmers by learning functions.',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces classes and objects, encapsulation, inheritance, and polymorphism.',
      technology: ['C#'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'Students will learn to create dynamic websites using JavaScript.',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course focuses on user experience, accessibility, performance optimization, and API usage.',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: false
    }
  ];

    // Handle button clicks and make one active at a time
  function setActiveButton(buttonId) {
    // Get all buttons and remove active class
    const buttons = document.querySelectorAll('.actionBtn')
      buttons.forEach(button => {
        button.classList.remove('active-filter-button');
      });

      // Add active class to the clicked button
      document.getElementById(buttonId).classList.add('active-filter-button');
    }

    // Function to display courses dynamically based on filter
  function displayCourses(filter = "all") {
    const courseContainer = document.getElementById('courseCards');
    const courseList = document.getElementById('courseList');
    courseContainer.innerHTML = '';
    courseList.innerHTML = '';
  
    let totalCredits = 0;
  
    const filteredCourses = courses.filter(course => {
      return filter === "all" || course.subject === filter;
    });
  
    filteredCourses.forEach(course => {
      // Create course card
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-card');
      if (course.completed) {
        courseCard.classList.add('completed');
      }
      courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      `;
      courseCard.addEventListener("click", () => displayModal(course))
      courseContainer.appendChild(courseCard);
  
      // Create list item
      const listItem = document.createElement('li');
      listItem.innerHTML = `${course.subject} ${course.number} - ${course.title} - <span class="credits">${course.credits} credits</span>`;
      courseList.appendChild(listItem);
  
      totalCredits += course.credits;
    });
  
    // Append total credits
    const totalListItem = document.createElement('li');
    totalListItem.innerHTML = `Total Credits: <span>${totalCredits} credits</span>`;
    courseList.appendChild(totalListItem);
  }
  
  // Event listeners for filter buttons
document.getElementById('allCourses').addEventListener('click', () => {
      displayCourses("all");
      setActiveButton('allCourses');
    });

    document.getElementById('cseCourses').addEventListener('click', () => {
      displayCourses("CSE");
      setActiveButton('cseCourses');
    });

    document.getElementById('wddCourses').addEventListener('click', () => {
      displayCourses("WDD");
      setActiveButton('wddCourses');
    });



    function displayModal (course) {
    const courseDetails = document.querySelector('.course-details');
    const ModalHeader = document.createElement('div')
    const closeButton = document.createElement('button');
    const subjectNumber = document.createElement('h2');
    const title = document.createElement('h3');
    const credits = document.createElement('p');
    const description = document.createElement ('p');
    const certificate = document.createElement('p');
    const techStack = document.createElement('p');

    courseDetails.innerHTML = '';
    closeButton.textContent = 'Close ❌';
    subjectNumber.innerHTML = `${course.subject} ${course.number}`;
    title.innerHTML = `${course.title}`;
    credits.innerHTML = `<strong>Credits</strong>: ${course.credits}`;
    certificate.innerHTML = `<strong>Certificate</strong>: ${course.certificate}`
    description.innerHTML = `${course.description}`;
    techStack.innerHTML = `<strong>Technologies</strong>: ${course.technology.join(', ')}`
    
    ModalHeader.appendChild(closeButton);
    ModalHeader.appendChild(subjectNumber);
    courseDetails.appendChild(ModalHeader);
    courseDetails.appendChild(title);
    courseDetails.appendChild(credits);
    courseDetails.appendChild(certificate);
    courseDetails.appendChild(description);
    courseDetails.appendChild(techStack);
  
    
    courseDetails.showModal();

    closeButton.addEventListener("click", () => {
        courseDetails.close();
    })

}

 // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update aria-expanded attribute
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Optionally prevent scrolling when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  });
  
  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Initial load of all courses
  displayCourses();
  

  // Set current year and last modified date in footer
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;