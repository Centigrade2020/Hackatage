// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import XMLParser from "react-xml-parser";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";

// const Test = () => {
//   const [flightData, setFlightData] = useState([
//     {
//       name: "OTA_AirDetailsRS",
//       attributes: {
//         PrimaryLangID: "eng",
//         Version: "1.0",
//         TransactionIdentifier: "",
//         FLSNote:
//           "This XML adds attributes not in the OTA XML spec. All such attributes start with FLS",
//         xmlns: "http://www.opentravel.org/OTA/2003/05",
//       },
//       children: [
//         {
//           name: "Success",
//           attributes: {},
//           children: [],
//           value: "",
//         },
//         {
//           name: "FLSResponseFields",
//           attributes: {
//             FLSOriginCode: "MAA",
//             FLSOriginName: "Chennai International Airport",
//             FLSDestinationCode: "DEL",
//             FLSDestinationName: "Indira Gandhi International Airport",
//             FLSStartDate: "2023-04-20",
//             FLSEndDate: "2023-04-20",
//             FLSResultCount: "3",
//             FLSRoutesFound: "178",
//             FLSBranchCount: "169",
//             FLSTargetCount: "206",
//             FLSRecordCount: "34922",
//           },
//           children: [],
//           value: "",
//         },
//         {
//           name: "FlightDetails",
//           attributes: {
//             TotalFlightTime: "PT2H45M",
//             TotalMiles: "1096",
//             TotalTripTime: "PT2H45M",
//             FLSDepartureDateTime: "2023-04-20T16:00:00",
//             FLSDepartureTimeOffset: "+0530",
//             FLSDepartureCode: "MAA",
//             FLSDepartureName: "Chennai International Airport",
//             FLSArrivalDateTime: "2023-04-20T18:45:00",
//             FLSArrivalTimeOffset: "+0530",
//             FLSArrivalCode: "DEL",
//             FLSArrivalName: "Indira Gandhi International Airport",
//             FLSFlightType: "NonStop",
//             FLSFlightLegs: "1",
//             FLSFlightDays: "...4...",
//             FLSDayIndicator: "",
//           },
//           children: [
//             {
//               name: "FlightLegDetails",
//               attributes: {
//                 DepartureDateTime: "2023-04-20T16:00:00",
//                 FLSDepartureTimeOffset: "+0530",
//                 ArrivalDateTime: "2023-04-20T18:45:00",
//                 FLSArrivalTimeOffset: "+0530",
//                 FlightNumber: "698",
//                 JourneyDuration: "PT2H45M",
//                 SequenceNumber: "1",
//                 LegDistance: "1096",
//                 FLSMeals: "F",
//                 FLSInflightServices: "",
//                 FLSUUID: "MAADEL202304206E698",
//               },
//               children: [
//                 {
//                   name: "DepartureAirport",
//                   attributes: {
//                     CodeContext: "IATA",
//                     LocationCode: "MAA",
//                     FLSLocationName: "Chennai International Airport",
//                     Terminal: "1",
//                     FLSDayIndicator: "",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "ArrivalAirport",
//                   attributes: {
//                     CodeContext: "IATA",
//                     LocationCode: "DEL",
//                     FLSLocationName: "Indira Gandhi International Airport",
//                     Terminal: "1D",
//                     FLSDayIndicator: "",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "MarketingAirline",
//                   attributes: {
//                     Code: "6E",
//                     CodeContext: "IATA",
//                     CompanyShortName: "IndiGo",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "Equipment",
//                   attributes: {
//                     AirEquipType: "320",
//                   },
//                   children: [],
//                   value: "",
//                 },
//               ],
//               value: "",
//             },
//           ],
//           value: "",
//         },
//         {
//           name: "FlightDetails",
//           attributes: {
//             TotalFlightTime: "PT2H45M",
//             TotalMiles: "1096",
//             TotalTripTime: "PT2H45M",
//             FLSDepartureDateTime: "2023-04-20T17:25:00",
//             FLSDepartureTimeOffset: "+0530",
//             FLSDepartureCode: "MAA",
//             FLSDepartureName: "Chennai International Airport",
//             FLSArrivalDateTime: "2023-04-20T20:10:00",
//             FLSArrivalTimeOffset: "+0530",
//             FLSArrivalCode: "DEL",
//             FLSArrivalName: "Indira Gandhi International Airport",
//             FLSFlightType: "NonStop",
//             FLSFlightLegs: "1",
//             FLSFlightDays: "...4...",
//             FLSDayIndicator: "",
//           },
//           children: [
//             {
//               name: "FlightLegDetails",
//               attributes: {
//                 DepartureDateTime: "2023-04-20T17:25:00",
//                 FLSDepartureTimeOffset: "+0530",
//                 ArrivalDateTime: "2023-04-20T20:10:00",
//                 FLSArrivalTimeOffset: "+0530",
//                 FlightNumber: "834",
//                 JourneyDuration: "PT2H45M",
//                 SequenceNumber: "1",
//                 LegDistance: "1096",
//                 FLSMeals: "M",
//                 FLSInflightServices: "",
//                 FLSUUID: "MAADEL20230420UK834",
//               },
//               children: [
//                 {
//                   name: "DepartureAirport",
//                   attributes: {
//                     CodeContext: "IATA",
//                     LocationCode: "MAA",
//                     FLSLocationName: "Chennai International Airport",
//                     Terminal: "1",
//                     FLSDayIndicator: "",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "ArrivalAirport",
//                   attributes: {
//                     CodeContext: "IATA",
//                     LocationCode: "DEL",
//                     FLSLocationName: "Indira Gandhi International Airport",
//                     Terminal: "3",
//                     FLSDayIndicator: "",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "MarketingAirline",
//                   attributes: {
//                     Code: "UK",
//                     CodeContext: "IATA",
//                     CompanyShortName: "Vistara",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "Equipment",
//                   attributes: {
//                     AirEquipType: "320",
//                   },
//                   children: [],
//                   value: "",
//                 },
//               ],
//               value: "",
//             },
//           ],
//           value: "",
//         },
//         {
//           name: "FlightDetails",
//           attributes: {
//             TotalFlightTime: "PT2H45M",
//             TotalMiles: "1096",
//             TotalTripTime: "PT2H45M",
//             FLSDepartureDateTime: "2023-04-20T18:15:00",
//             FLSDepartureTimeOffset: "+0530",
//             FLSDepartureCode: "MAA",
//             FLSDepartureName: "Chennai International Airport",
//             FLSArrivalDateTime: "2023-04-20T21:00:00",
//             FLSArrivalTimeOffset: "+0530",
//             FLSArrivalCode: "DEL",
//             FLSArrivalName: "Indira Gandhi International Airport",
//             FLSFlightType: "NonStop",
//             FLSFlightLegs: "1",
//             FLSFlightDays: "...4...",
//             FLSDayIndicator: "",
//           },
//           children: [
//             {
//               name: "FlightLegDetails",
//               attributes: {
//                 DepartureDateTime: "2023-04-20T18:15:00",
//                 FLSDepartureTimeOffset: "+0530",
//                 ArrivalDateTime: "2023-04-20T21:00:00",
//                 FLSArrivalTimeOffset: "+0530",
//                 FlightNumber: "882",
//                 JourneyDuration: "PT2H45M",
//                 SequenceNumber: "1",
//                 LegDistance: "1096",
//                 FLSMeals: "F",
//                 FLSInflightServices: "",
//                 FLSUUID: "MAADEL202304206E882",
//               },
//               children: [
//                 {
//                   name: "DepartureAirport",
//                   attributes: {
//                     CodeContext: "IATA",
//                     LocationCode: "MAA",
//                     FLSLocationName: "Chennai International Airport",
//                     Terminal: "1",
//                     FLSDayIndicator: "",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "ArrivalAirport",
//                   attributes: {
//                     CodeContext: "IATA",
//                     LocationCode: "DEL",
//                     FLSLocationName: "Indira Gandhi International Airport",
//                     Terminal: "1D",
//                     FLSDayIndicator: "",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "MarketingAirline",
//                   attributes: {
//                     Code: "6E",
//                     CodeContext: "IATA",
//                     CompanyShortName: "IndiGo",
//                   },
//                   children: [],
//                   value: "",
//                 },
//                 {
//                   name: "Equipment",
//                   attributes: {
//                     AirEquipType: "321",
//                   },
//                   children: [],
//                   value: "",
//                 },
//               ],
//               value: "",
//             },
//           ],
//           value: "",
//         },
//       ],
//       value: "",
//     },
//   ]);
//   const styles = StyleSheet.create({
//     page: {
//       flexDirection: "row",
//       backgroundColor: "#E4E4E4",
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1,
//     },
//   });
//   // Flight

//   //   const options = {
//   //     method: "GET",
//   //     // url: "https://timetable-lookup.p.rapidapi.com/TimeTable/MAA/DEL/20230420/",
//   //     params: { Results: "3", Max_Results: "3" },
//   //     headers: {
//   //       "X-RapidAPI-Key": "54fb866cd8mshb99f4f47ec1655ap117b34jsnd2baed40b395",
//   //       "X-RapidAPI-Host": "timetable-lookup.p.rapidapi.com",
//   //       "Content-Type": "application/json",
//   //     },
//   //   };
//   //   useEffect(() => {
//   //     axios
//   //       .request(options)

//   //       .then(function (response) {
//   //         var xml = new XMLParser().parseFromString(response.data);
//   //         console.log(xml);
//   //         // setFlightData(xml);
//   //       })
//   //       .catch(function (error) {
//   //         console.error(error);
//   //       });
//   //   }, []);
//   // import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

//   return (
//     <div>
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View style={styles.section}>
//             <Text>Section #1</Text>
//           </View>
//           <View style={styles.section}>
//             <Text>Section #2</Text>
//           </View>
//         </Page>
//       </Document>
//       <PDFDownloadLink
//         document={
//           <Document>
//             <Page size="A4" style={styles.page}>
//               <View style={styles.section}>
//                 <Text>Section #1</Text>
//               </View>
//               <View style={styles.section}>
//                 <Text>Section #2</Text>
//               </View>
//             </Page>
//           </Document>
//         }
//         fileName="fee_acceptance.pdf"
//       >
//         {({ blob, url, loading, error }) =>
//           loading ? "Loading document..." : "Download now!"
//         }
//       </PDFDownloadLink>
//     </div>
//   );
// };

// export default Test;
// // Flight

// // {console.log(flightData)}
// //       {flightData.map((index, key) =>
// //         index.children.slice(2).map((i, k) => (
// //           <>
// //             {i.children.map((val, ke) => (
// //               <>
// //                 <h1>{val.attributes.FLSUUID}</h1>
// //                 <h1>{val.children[2].attributes.CompanyShortName}</h1>
// //               </>
// //             ))}
// //             <p>{i.attributes.TotalFlightTime}</p>
// //             <p>{i.attributes.TotalMiles}</p>
// //             <p>{i.attributes.FLSDepartureCode}</p>
// //             <p>{i.attributes.FLSDepartureDateTime}</p>
// //             <p>{i.attributes.FLSDepartureName}</p>
// //             <p>{i.attributes.FLSArrivalCode}</p>
// //             <p>{i.attributes.FLSArrivalDateTime}</p>
// //             <p>{i.attributes.FLSArrivalName}</p>
// //             <p>{i.attributes.FLSFlightType}</p>
// //             <p>{i.attributes.FLSFlightLegs}</p>

// //             <br></br>
// //           </>
// //         ))
// //       )}
