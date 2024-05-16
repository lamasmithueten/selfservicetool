import React, { useState, useEffect } from "react";
import "./Employee.css";

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());


    useEffect(() => {
        const prevNextIcon = document.querySelectorAll(".icons span");

        const clickHandlers = Array.from(prevNextIcon).map((icon) => {
            const handleNavigationClick = () => {
                handleNavigation(icon.id);
            };

            icon.addEventListener("click", handleNavigationClick);

            // Return the cleanup function for this specific icon
            return () => {
                icon.removeEventListener("click", handleNavigationClick);
            };
        });

        // Return a cleanup function that calls all the individual cleanup functions
        return () => {
            clickHandlers.forEach(cleanup => cleanup());
        };
    }, []);




    useEffect(() => {
        renderCalendar();
    }, [currentDate]);

    const renderCalendar = () => {
        let currYear = currentDate.getFullYear();
        let currMonth = currentDate.getMonth();
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        console.log(months);

        let currentMonthName = months[currMonth];
        let formattedDate = `${currentMonthName} ${currYear}`;
        console.log("Formatted Date:", formattedDate);

        const currentDateElement = document.querySelector(".current-date");
        currentDateElement.innerText = formattedDate; // Update the text content of the element

        const daysTag = document.querySelector(".days");

        let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let liTag = "";
        //console.log(lastDateOfMonth);

        for (let i = 1; i <= lastDateOfMonth; i++) {
            liTag += `<li>${i}</li>`;
        }

        daysTag.innerHTML = liTag;
    };

    const handleNavigation = (direction) => {
        setCurrentDate((prevDate) => {
            let newDate = new Date(prevDate);
            if (direction === "prev") {
                newDate.setMonth(newDate.getMonth() - 1);
            } else if (direction === "next") {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    // implementing the pop up vacation request box
    document.addEventListener('DOMContentLoaded', (event) => {
        const openModalButtons = document.querySelectorAll('[data-modal-target]')
        const closeModalButtons = document.querySelectorAll('[data-close-button]')
        const overlay = document.getElementById('overlay')

    


    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
    });

    return (
        <div className="wrapper1">
            <div className="calendarWrapper">
                <div className="goto">
                    <header>
                        <p className="current-date"></p>
                        <div className="icons">
                            <span id="prev" className="material-symbols-rounded">
                                chevron_left
                            </span>
                            <span id="next" className="material-symbols-rounded">
                                chevron_right
                            </span>
                        </div>
                    </header>
                </div>
                <div className="calendar">
                    <ul className="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>

                    <ul className="days"></ul>
                </div>
            </div>

            <div className="container">
                <button data-modal-target="#modal" className="requestVacation">request vacation</button>
                <div className="modal" id="modal">
                    <div className="modal-header">
                        <div className="title">Example Modal</div>
                        <button data-close-button className="close-button">&times;</button>
                    </div>
                    <div className="modal-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod alias ut illo doloremque eum ipsum obcaecati distinctio debitis reiciendis quae quia soluta totam doloribus quos nesciunt necessitatibus, consectetur quisquam accusamus ex, dolorum, dicta vel? Nostrum voluptatem totam, molestiae rem at ad autem dolor ex aperiam. Amet assumenda eos architecto, dolor placeat deserunt voluptatibus tenetur sint officiis perferendis atque! Voluptatem maxime eius eum dolorem dolor exercitationem quis iusto totam! Repudiandae nobis nesciunt sequi iure! Eligendi, eius libero. Ex, repellat sapiente!
                    </div>
                </div>
                <div id="overlay"></div>
                <div className="leftOverVacation">sdasdasdasd</div>
            </div>
        </div>
    );
};

export default Home;
