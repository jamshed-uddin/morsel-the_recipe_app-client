import React from "react";

const instructions = ({ instructions }) => {
  let instructionStep = 0;

  return (
    <div className="">
      {instructions?.map((instruction, index) => {
        return (
          <div
            key={index}
            className={`text-xl ${instruction.header ? "" : "mb-2"}`}
          >
            {instruction.header ? (
              <span className="text-xl font-bold ">{instruction.header}</span>
            ) : (
              <p>
                <h3 className="font-semibold">
                  {instruction && `Step ${++instructionStep}`}
                </h3>

                <p className="pb-2"> {instruction && instruction}</p>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const RecipeInstructions = React.memo(instructions);

export default RecipeInstructions;
