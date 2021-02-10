import React from "react";
import axios from "axios";
import { baseUrl } from "../components/Parameters";
import { JobsContainer, Wrapper } from "../components/Styled";
import { JobCard } from "../components/JobCard";

export class HiredJobsPage extends React.Component {
  state = {
    takenJobs: [],
    regularPage: true,
    showIcons: true,
  };

  componentDidMount() {
    this.takenJobs();
  }

  componentDidUpdate() {
    this.takenJobs();
  }

  takenJobs = async () => {
    try {
      const res = await axios.get(baseUrl);
      let takenJobsArray = [];
      res.data.jobs.forEach((job) => {
        if (job.taken === true) {
          takenJobsArray.push(job);
        }
      });
      this.setState({ takenJobs: takenJobsArray });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Wrapper>
        <JobsContainer>
          {this.state.takenJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                description={job.description}
                value={job.value}
                paymentMethods={job.paymentMethods}
                dueDate={job.dueDate}
                regularPage={this.state.regularPage}
                taken={job.taken}
                showIcons={this.state.showIcons}
              />
            );
          })}
        </JobsContainer>
      </Wrapper>
    );
  }
}
