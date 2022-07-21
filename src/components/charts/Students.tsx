import { Card, Col, Row } from "antd";
import ReactECharts from "echarts-for-react";
import { useState } from "react";

export function StudentsChart() {
  const [students, setStudents] = useState([
    10, 120, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  let getOptions = (data: any) => {
    return {
      color: "rgba(17,24,39,var(--tw-bg-opacity))",
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          type: "bar",
          barWidth: "60%",
          data,
        },
      ],
    };
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="py-3 px-5 bg-gray-50">Statistics</div>
      <div className="p-10">
        <Row justify="center" gutter={20}>
          <Col style={{ marginBottom: 20 }} lg={{ span: 10 }} xs={{ span: 23 }}>
            <Card>
              <ReactECharts
                option={{
                  ...getOptions(students),
                  title: {
                    text: "STUDENTS",
                  },
                }}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: "220px", width: "100%" }}
              />
            </Card>
          </Col>
          <Col style={{ marginBottom: 20 }} lg={{ span: 10 }} xs={{ span: 23 }}>
            <Card>
              <ReactECharts
                option={{
                  ...getOptions([]),
                  title: {
                    text: "PAYMENTS",
                  },
                }}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: "220px", width: "100%" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
