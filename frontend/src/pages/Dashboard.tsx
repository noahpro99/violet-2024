import Navbar from '../components/Navbar';
import StyleLineGraph from '../components/StyleLineGraph';
import Logo from '../components/logo';
import ReadingsCard from '../components/ReadingsCard';
import { MaternityRecord, DefaultService } from '../api';
import React from 'react';
import Loading from '../components/Loading';

const Dashboard = () => {
  // react query to get data
  const [mRecords, setMRecords] = React.useState<MaternityRecord[] | null>(null);
  const [graphSelectedVar, setGraphSelectedVar] = React.useState<string>("Systolic Blood Pressure");

  React.useEffect(() => {
    DefaultService.getResultsResultsGet().then((res) => {
      setMRecords(res);
    });

  }, []);

  if (!mRecords) {
    return <Loading spinner />
  }

  let graphDataVars = ["Systolic Blood Pressure",
    "Diastolic Blood Pressure",
    "Blood Sugar",
    "Body Temperature",
    "Heart Rate",
      ]

  let graphsData = graphDataVars.map((graphDataVar) => {
    let data = mRecords.map((reading) => {
      if (graphDataVar === "Systolic Blood Pressure") {
        return {
          x: reading.date,
          y: reading.SystolicBP
        }
      } else if (graphDataVar === "Diastolic Blood Pressure") {
        return {
          x: reading.date,
          y: reading.DiastolicBP
        }
      } else if (graphDataVar === "Blood Sugar") {
        return {
          x: reading.date,
          y: reading.BS
        }
      } else if (graphDataVar === "Body Temperature") {
        return {
          x: reading.date,
          y: reading.BodyTemp
        }
      } else {
        return {
          x: reading.date,
          y: reading.HeartRate
        }
      };
    });
    let graphData = [{
      id: graphDataVar,
      color: "#f6a4ab",
      data: data,
    }]
    return graphData;
  });

  const graphs = graphsData.map((graphData) => {
    console.log(graphData);
    return (
      <>
        <StyleLineGraph data={graphData} height={250} />
        <div className="p-2 flex overflow-x-scroll space-x-2 py-3 w-full no-scrollbar text-blue-500">
          <button className={`rounded-lg px-2 py-1 whitespace-nowrap border-blue-500 ${graphSelectedVar === "Systolic Blood Pressure" && "shadow-xl bg-blue-500 text-white"} border-2`} onClick={() => { setGraphSelectedVar("Systolic Blood Pressure"); }}>Systolic BP</button>
          <button className={`rounded-lg px-2 py-1 whitespace-nowrap border-blue-500 ${graphSelectedVar === "Diastolic Blood Pressure" && "shadow-xl bg-blue-500 text-white"} border-2`} onClick={() => { setGraphSelectedVar("Diastolic Blood Pressure"); }}>Diastolic BP</button>
          <button className={`rounded-lg px-2 py-1 whitespace-nowrap border-blue-500 ${graphSelectedVar === "Blood Sugar" && "shadow-xl bg-blue-500 text-white"} border-2`} onClick={() => { setGraphSelectedVar("Blood Sugar"); }}>Blood Sugar</button>
          <button className={`rounded-lg px-2 py-1 whitespace-nowrap border-blue-500 ${graphSelectedVar === "Body Temperature" && "shadow-xl bg-blue-500 text-white"} border-2`} onClick={() => { setGraphSelectedVar("Body Temperature"); }}> Body Temperature</button >
          <button className={`rounded-lg px-2 py-1 whitespace-nowrap border-blue-500 ${graphSelectedVar === "Heart Rate" && "shadow-xl bg-blue-500 text-white"} border-2`} onClick={() => { setGraphSelectedVar("Heart Rate"); }}>Heart Rate</button>
        </div>
      </>
    )
  });

  let readings: { riskLevel: string, date: string, id: string }[] = mRecords.map((record) => {
    let resultIntToStr = [
      "Low",
      "Medium",
      "High"
  ]

  return {
    riskLevel: resultIntToStr[record.result],
    date: record.date,
    id: record.id
  }
});


  return (
    <div className="flex flex-col items-center min-h-screen bg-white">

      {/* parent of line must have defined size */}
      <Logo logoText="Aether" />
      {graphs[graphDataVars.findIndex((graphDataVar) => graphDataVar === graphSelectedVar)]}
      <div className="border-b-2 w-full border-blue-500" />
      <ReadingsCard readings={readings} />
      <div className="p-16" />
      <Navbar />

    </div>
  );
}

export default Dashboard;