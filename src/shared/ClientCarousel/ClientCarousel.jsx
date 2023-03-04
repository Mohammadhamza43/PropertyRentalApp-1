import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ClientCarousel(props) {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const carousel = props.carouselData.map((element, key) => {
        return (
            // <h1 >{element.p1}</h1>
            <div key={key} className="item">
                <div className="testimony-wrap py-4">
                    <div className="text">
                        <p className="mb-4">{element.p1}</p>
                        <div className="d-flex align-items-center">
                            <div className="user-img" style={{ backgroundImage: `url(${element.image})` }}></div>
                            <div className="pl-3">
                                <p className="name">{element.p2}</p>
                                <span className="position">{element.span}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
        <Carousel 
        swipeable={false}
        draggable={false}
        arrows={false}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>

            {carousel}
        </Carousel>

        
        </>
    )
}

export default ClientCarousel 