import { Box } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { TravelDestinationCard } from '../Cards/Trip/TravelDestination'


export const DestinationSwiper = chakra(({className})=>{
return(
    <StaticQuery 
    query={graphql`
    query{
        buenos: file(relativePath: { eq: "buenos.png" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    montevideo: file(relativePath: { eq: "montevideo.png" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    moscow: file(relativePath: { eq: "moscow.png" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    rio: file(relativePath: { eq: "rio.png" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    sao: file(relativePath: { eq: "sao.png" }) {
      childImageSharp {
        fixed(height: 400, cropFocus: CENTER, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    } 
    
    
    `}
        render={data=>(

            <Box className={className} pt="50px" w="100%">
            <Swiper
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              spaceBetween={40}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              <SwiperSlide>
                <TravelDestinationCard
                  
                  destinationId={1}
                  destinationName="Buenos Aires"
                  rewardsAvailable="10,302"
                  tripsCount="100"
                  ordersCount="300"
                  img={data.buenos.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Moscow"
                  rewardsAvailable="15,302"
                  tripsCount="200"
                  ordersCount="350"
                  img={data.moscow.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Montevideo"
                  rewardsAvailable="10,302"
                  tripsCount="100"
                  ordersCount="300"
                  img={data.montevideo.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Rio de Janeiro"
                  rewardsAvailable="10,302"
                  tripsCount="100"
                  ordersCount="300"
                  img={data.rio.childImageSharp.fixed}
                />
              </SwiperSlide>
              <SwiperSlide>
                <TravelDestinationCard
                  destinationId={1}
                  destinationName="Sao Paulo"
                  rewardsAvailable="10,302"
                  tripsCount="100"
                  ordersCount="300"
                  img={data.sao.childImageSharp.fixed}
                />
              </SwiperSlide>
            </Swiper>
          </Box>


        )}
    
    />
   
)





})