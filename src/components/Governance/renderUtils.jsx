export const getPercentage = (_option, _options) => {
  const totalVotesAmount = Object.values(_options).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const percentage = ((_options[_option] / totalVotesAmount) * 100).toFixed(2);

  return percentage;
};

function formatTime(seconds) {
  const countdown = Number(seconds) - Math.floor(Date.now() / 1000);

  const days = Math.floor(countdown / (3600 * 24));
  const hours = Math.floor((countdown % (3600 * 24)) / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);

  let result = "";

  if (days > 0) {
    result += days + (days > 1 ? " days" : " day");
  }

  if (hours > 0) {
    result +=
      (result !== "" ? " " : "") + hours + (hours > 1 ? " hours" : " hour");
  }

  if (minutes > 0) {
    result +=
      (result !== "" ? " " : "") +
      minutes +
      (minutes > 1 ? " minutes" : " minute");
  }

  return result;
}

export const getTimeText = (currentDate, startsIn, endsIn) => {
  if (currentDate >= startsIn) {
    if (currentDate >= endsIn) {
      return <>Has already ended</>;
    } else {
      return <>Ends in {formatTime(endsIn)}</>;
    }
  } else {
    return <>Starts in {formatTime(startsIn)}</>;
  }
};

export const renderCoreFunctionParamInputs = (
  proposalForm,
  handleProposalDataChange
) => {
  const proposalTarget = proposalForm.proposalTarget;
  const proposalFunction = proposalForm.proposalFunc;
  let paramInputs;

  if (proposalFunction.startsWith("replace")) {
    paramInputs = (
      <input
        type="text"
        placeholder={`New ${proposalFunction.substring(7)} contract address`}
        className="proposalFuncParams"
        value={proposalForm.proposalFuncParams[0]}
        min="42"
        max="42"
        required
        onChange={handleProposalDataChange}
      />
    );
  }

  if (proposalTarget === "Treasury") {
    switch (proposalFunction) {
      case "sendAsset": // both are simpletype 1
      case "sendEther":
        paramInputs = (
          <>
            <input
              type="text"
              placeholder={`Receiver wallet`}
              className="proposalFuncParams"
              value={proposalForm.proposalFuncParams[0]}
              min="42"
              max="42"
              required
              onChange={handleProposalDataChange}
            />
            {proposalFunction === "sendAsset" && (
              <select
                name="proposalFunc"
                id="proposalFunc"
                className="proposalFuncParams"
                value={proposalForm.proposalFuncParams[1]}
                onChange={(e) => handleProposalDataChange(e, 1)}
              >
                <option value="">Select an asset to send</option>
                <option value="0">Asset 1</option>
                <option value="1">Asset 2</option>
                <option value="2">Asset 3</option>
                <option value="3">Asset 4</option>
                <option value="4">Asset 5</option>
              </select>
            )}

            <input
              type="text"
              placeholder={`Amount to send`}
              className="proposalFuncParams"
              value={
                proposalForm.proposalFuncParams[
                  proposalFunction === "sendAsset" ? 2 : 1
                ]
              }
              required
              onChange={(e) =>
                handleProposalDataChange(
                  e,
                  proposalFunction === "sendAsset" ? 2 : 1
                )
              }
            />
          </>
        );

        break;

      case "registerAsset": // simpleType 2
        paramInputs = (
          <>
            <select
              name="proposalFunc"
              id="proposalFunc"
              className="proposalFuncParams"
              value={proposalForm.proposalFuncParams[1]}
              onChange={(e) => handleProposalDataChange(e, 1)}
            >
              <option value="">Select an asset slot</option>
              <option value="0">Asset 1</option>
              <option value="1">Asset 2</option>
              <option value="2">Asset 3</option>
              <option value="3">Asset 4</option>
              <option value="4">Asset 5</option>
            </select>

            <input
              type="text"
              placeholder={`New asset contract address`}
              className="proposalFuncParams"
              value={proposalForm.proposalFuncParams[0]}
              min="42"
              max="42"
              required
              onChange={handleProposalDataChange}
            />
          </>
        );
        break;

      case "changeRegisteredAssetLimit": // simpleType 3
        paramInputs = (
          <input
            type="numer"
            placeholder={`New asset limit`}
            className="proposalFuncParams"
            value={proposalForm.proposalFuncParams[0]}
            min="1"
            max="10"
            required
            onChange={handleProposalDataChange}
          />
        );
        break;

      default:
        break;
    }
  }

  if (proposalTarget === "Sales" && proposalFunction != "") {
    const returnPlaceholderText = () => {
      switch (proposalFunction) {
        case "changeSaleFoundationFee": // simpleType 9
          return "New Foundation Sale fee (in Basis Points)";

        case "changeSaleRetractFee": // simpleType 10
          return "New Foundation Sale fee (in Basis Points)";

        case "changeSaleMinimumDeposit": // simpleType 11
          return "New Minimum Sale deposit (in CLD amount)";

        case "changeSaleDefaultSaleLength": // simpleType 12
          return "New Default Sale length (in days)";

        case "changeSaleMaxSalePercent": // simpleType 13
          return "New Max Sale percent";

        case "createSale": // simpleType 7
          return "CLD Amount to Sale";
      }
    };

    paramInputs = (
      <input
        type="number"
        placeholder={`${returnPlaceholderText()}`}
        className="proposalFuncParams"
        value={proposalForm.proposalFuncParams[0]}
        min="1"
        max="10"
        required
        onChange={handleProposalDataChange}
      />
    );
  }

  if (proposalTarget === "Voting") {
    switch (proposalFunction) {
      case "changeProposalCost": // simpleType 8
      case "changeQuorum": // simpleType 14
        paramInputs = (
          <input
            type="number"
            placeholder={
              proposalFunction === "changeProposalCost"
                ? "Change proposal CLD cost (in CLD amount)"
                : "Change proposal required quorum (in Basis Points)"
            }
            className="proposalFuncParams"
            value={proposalForm.proposalFuncParams[0]}
            min="1"
            max="10"
            required
            onChange={handleProposalDataChange}
          />
        );
        break;

      default:
        break;
    }
  }

  console.log(proposalForm);

  return paramInputs;
};
