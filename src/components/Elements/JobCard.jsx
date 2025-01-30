import React from "react";
import BlogBox from "../Elements/BlogBox";

export default function JobCard({ job, onClick }) {
  return (
    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <BlogBox
        title={job.title}
        text={job.location}
        tag="Candidatar-se"
        author="Saiba mais"
        action={() => onClick(job)}
      />
    </div>
  );
}