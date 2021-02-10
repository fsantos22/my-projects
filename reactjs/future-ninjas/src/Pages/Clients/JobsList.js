import React from "react";
import axios from "axios";
import { baseUrl } from "../../components/Parameters";
import { JobCard } from "../../components/JobCard";
import {
  JobsContainer,
  Wrapper,
} from "../../components/Styled";
import InternalHeader from "../../components/InternalHeader";
export class JobsList extends React.Component {
  state = {
    jobs: [],
    jobsFilter: {
      searchName: "",
      minValue: -Infinity,
      maxValue: Infinity,
    },
    selectedOrder: "",
    showIcons: true,
    regularPage: true,
  };

  componentDidMount() {
    this.getAllJobs();
  }

  componentDidUpdate() {
    this.getAllJobs();
  }

  getAllJobs = async () => {
    try {
      const res = await axios.get(baseUrl);
      this.setState({ jobs: res.data.jobs });
    } catch (err) {
      console.log(err);
    }
  };

  // FUNÇÃO PARA ORDERNAR LISTA
  sortItems = (jobA, jobB) => {
    const { selectedOrder } = this.state;

    if (selectedOrder === "asc") {
      return jobA.value - jobB.value;
    } else if (selectedOrder === "desc") {
      return jobB.value - jobA.value;
    }
  };

  // CAPTURA SE ORDEM É CRESCENTE OU DECRESCENTE
  orderType = (e) => {
    this.setState({
      selectedOrder: e.target.value,
    });
  };

  onChangeSearchName = (e) => {
    this.setState({
      jobsFilter: {
        ...this.state.jobsFilter,
        searchName: e.target.value,
      },
    });
  };

  onChangeMinValue = (e) => {
    this.setState({
      jobsFilter: {
        ...this.state.jobsFilter,
        minValue: Number(e.target.value),
      },
    });
  };

  onChangeMaxValue = (e) => {
    this.setState({
      jobsFilter: {
        ...this.state.jobsFilter,
        maxValue: Number(e.target.value),
      },
    });
  };

  // FUNÇÃO DE RENDERIZAÇÃO DO QUE FOR FILTRADO
  filterJobs = () => {
    const { jobs } = this.state;

    let filteredJobs = jobs
      .filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes(this.state.jobsFilter.searchName.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(this.state.jobsFilter.searchName.toLowerCase())
      )
      .filter(
        (job) => job.value >= (this.state.jobsFilter.minValue || -Infinity)
      )
      .filter(
        (job) => job.value <= (this.state.jobsFilter.maxValue || Infinity)
      );

    return filteredJobs;
  };

  render() {
    // RENDERIZA O QUE FOR FILTRADO
    const filteredJobs = this.filterJobs();
    // ORDENA O QUE FOI RENDERIZADO E RENDERIZA
    const orderedJobs = filteredJobs.sort(this.sortItems);
    return (
      <Wrapper>
        <InternalHeader
          onChangeSearchName={this.onChangeSearchName}
          onChangeMinValue={this.onChangeMinValue}
          onChangeMaxValue={this.onChangeMaxValue}
          orderType={this.orderType}
          selectedOrder={this.state.selectedOrder}
        />

        <JobsContainer>
          {orderedJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                id={job.id}
                showIcons={this.state.showIcons}
                title={job.title}
                description={job.description}
                value={job.value}
                paymentMethods={job.paymentMethods}
                dueDate={job.dueDate}
                taken={job.taken}
                regularPage={this.state.regularPage}
              />
            );
          })}
        </JobsContainer>
      </Wrapper>
    );
  }
}
