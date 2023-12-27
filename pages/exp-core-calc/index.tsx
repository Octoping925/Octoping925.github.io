import { ReactElement, useState } from "react";
import { Button, Input, Radio } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  EXP_CORE_EXP,
  REINFORCE_CORE_EXP_ARR,
  SKILL_CORE_EXP_ARR,
} from "@/constant/core-exp";
import { NextPageWithLayout } from "@/pages/_app";
import { Layout } from "@/component/Layout";

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

  const { handleSubmit, setValue } = useForm<Input>({
    defaultValues: { beforeCoreExpPercent: 0 },
  });
  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);

    const result = output(data);
    setResultState(result);
  };

  return (
    <div>
      <form>
        <Radio.Group>
          <Radio.Button
            value="skill"
            onChange={() => setValue("coreType", "skill")}
          >
            스킬코어
          </Radio.Button>
          <Radio.Button
            value="reinforce"
            onChange={() => setValue("coreType", "reinforce")}
          >
            강화코어
          </Radio.Button>
        </Radio.Group>

        <p>
          {" "}
          강화하고 싶은 코어 레벨{" "}
          <Input
            type="number"
            min="1"
            max="25"
            onChange={(e) =>
              setValue("beforeCoreLevel", Number(e.target.value))
            }
          />
        </p>
        <p>
          {" "}
          강화하고 싶은 코어 경험치 %{" "}
          <Input
            type="number"
            defaultValue={0}
            min="0"
            max="99"
            onChange={(e) =>
              setValue("beforeCoreExpPercent", Number(e.target.value))
            }
          />
        </p>
        <p>
          {" "}
          먹일 경험의 코어젬스톤 갯수{" "}
          <Input
            type="number"
            min="0"
            max="25"
            onChange={(e) =>
              setValue("willUseExpCoreAmount", Number(e.target.value))
            }
          />
        </p>
        <Button onClick={handleSubmit(onSubmit)}>계산</Button>
      </form>
      <br />
      <br />
      {resultState && (
        <div>
          <p>먹인 후의 코어의 레벨: {resultState.afterCoreLevel}</p>
          <p>경험치: {resultState.afterCoreExpPercent.toFixed(2)}%</p>
        </div>
      )}
    </div>
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
