import PageSpinner from "@/components/spinners/PageSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="fix-height p-5 flex items-center justify-center">
      <PageSpinner />
    </div>
  );
};

export default Loading;
