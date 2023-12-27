import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  EXP_CORE_EXP,
  REINFORCE_CORE_EXP_ARR,
  SKILL_CORE_EXP_ARR,
} from "../../constant/core-exp";
import { NextPageWithLayout } from "../_app";
import { Layout } from "../../component/Layout";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Card,
} from "@mui/material";

type Input = {
  coreType: "skill" | "reinforce";
  beforeCoreLevel: number;
  beforeCoreExpPercent: number;
  willUseExpCoreAmount: number;
};

type ResultState = {
  afterCoreLevel: number;
  afterCoreExpPercent: number;
};

const ExpCoreExpCalculator: NextPageWithLayout = () => {
  const [resultState, setResultState] = useState<ResultState>();

  const { handleSubmit, getValues, setValue } = useForm<Input>({
    defaultValues: { beforeCoreExpPercent: 0 },
  });
  const onSubmit: SubmitHandler<Input> = (data) => {
    const result = output(data);
    setResultState(result);
  };

  return (
    <>
      <Card
        style={{
          margin: "20px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ToggleButtonGroup value={getValues("coreType")}>
          <ToggleButton
            value="skill"
            onChange={() => setValue("coreType", "skill")}
          >
            스킬코어
          </ToggleButton>
          <ToggleButton
            value="reinforce"
            onChange={() => setValue("coreType", "reinforce")}
          >
            강화코어
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <TextField
          type="number"
          label="강화하고 싶은 코어 레벨"
          onChange={(e) => setValue("beforeCoreLevel", Number(e.target.value))}
        />
        <br />
        <TextField
          type="number"
          label="강화하고 싶은 코어 경험치 %"
          defaultValue={0}
          onChange={(e) =>
            setValue("beforeCoreExpPercent", Number(e.target.value))
          }
        />
        <br />
        <TextField
          type="number"
          label="먹일 경험의 코어젬스톤 갯수"
          onChange={(e) =>
            setValue("willUseExpCoreAmount", Number(e.target.value))
          }
        />
        <br />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          계산
        </Button>
      </Card>
      {resultState && (
        <Card style={{ margin: "20px", padding: "30px" }}>
          <p>먹인 후의 코어의 레벨: {resultState.afterCoreLevel}</p>
          <p>경험치: {resultState.afterCoreExpPercent.toFixed(2)}%</p>
        </Card>
      )}
    </>
  );
};

function output({
  coreType,
  beforeCoreLevel,
  beforeCoreExpPercent,
  willUseExpCoreAmount,
}: Input): ResultState {
  const expAmountArr =
    coreType === "skill" ? SKILL_CORE_EXP_ARR : REINFORCE_CORE_EXP_ARR;

  const currentLevelAmountExp =
    expAmountArr[beforeCoreLevel + 1] - expAmountArr[beforeCoreLevel];

  const expCoreExpAmount = willUseExpCoreAmount * EXP_CORE_EXP;

  const exp =
    expAmountArr[beforeCoreLevel] +
    (currentLevelAmountExp * beforeCoreExpPercent) / 100 +
    expCoreExpAmount;

  const afterCoreLevel = expAmountArr.findLastIndex(
    (coreExp) => coreExp <= exp,
  );

  const afterCoreExpPercent =
    ((exp - expAmountArr[afterCoreLevel]) /
      (expAmountArr[afterCoreLevel + 1] - expAmountArr[afterCoreLevel])) *
    100;

  return { afterCoreExpPercent, afterCoreLevel };
}

ExpCoreExpCalculator.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ExpCoreExpCalculator;
