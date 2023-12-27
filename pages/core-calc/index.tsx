import { ReactElement, useState } from "react";
import { Button, Input, Radio } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CORE_EXP,
  EXP_CORE_EXP,
  REINFORCE_CORE_EXP_ARR,
  REINFORCE_CORE_PIECE,
  SKILL_CORE_EXP_ARR,
  SKILL_CORE_PIECE_COST,
} from "@/constant/core-exp";
import { Layout } from "@/component/Layout";
import { NextPageWithLayout } from "@/pages/_app";

type Input = {
  coreType: "skill" | "reinforce";
  beforeCoreLevel: number;
  beforeCoreExpPercent: number;
  goalLevel: number;
};

type ResultState = {
  neededExp: number;
  needed1LvCoreAmount: number;
  averageNeededCoreAmount: number;
  maxNeededCoreAmount: number;
  neededExpCoreAmount: number;
};

const CoreExpCalculator: NextPageWithLayout = () => {
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
            onChange={(e) => setValue("coreType", "skill")}
          >
            스킬코어
          </Radio.Button>
          <Radio.Button
            value="reinforce"
            onChange={(e) => setValue("coreType", "reinforce")}
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
          목표 레벨{" "}
          <Input
            type="number"
            min="0"
            max="25"
            onChange={(e) => setValue("goalLevel", Number(e.target.value))}
          />
        </p>
        <Button onClick={handleSubmit(onSubmit)}>계산</Button>
      </form>
      <br />
      <br />
      {resultState && (
        <div>
          <p>필요한 경험치: {resultState.neededExp} </p>
          <p>필요한 1렙 코어의 갯수: {resultState.needed1LvCoreAmount}개</p>
          <p>
            평균적으로 필요한 코어 젬스톤의 갯수:{" "}
            {resultState.averageNeededCoreAmount.toFixed(2)}개
          </p>
          <p>
            최대 필요한 코어 젬스톤의 갯수:{" "}
            {resultState.maxNeededCoreAmount.toFixed(2)}개
          </p>
          <br />
          <p>
            필요한 경코젬의 갯수: {resultState.neededExpCoreAmount.toFixed(2)}개
          </p>
          <br />
        </div>
      )}
    </div>
  );
};

function output({
  coreType,
  beforeCoreLevel,
  beforeCoreExpPercent,
  goalLevel,
}: Input): ResultState {
  const expAmountArr =
    coreType === "skill" ? SKILL_CORE_EXP_ARR : REINFORCE_CORE_EXP_ARR;

  const levelToLevelExpAmount =
    expAmountArr[goalLevel] - expAmountArr[beforeCoreLevel];

  const currentLevelLeftExp =
    ((expAmountArr[beforeCoreLevel + 1] - expAmountArr[beforeCoreLevel]) *
      beforeCoreExpPercent) /
    100;

  const exp = levelToLevelExpAmount - currentLevelLeftExp;

  if (coreType === "skill") {
    return {
      neededExp: exp,
      needed1LvCoreAmount: exp / CORE_EXP,
      averageNeededCoreAmount: exp * 0.1302,
      maxNeededCoreAmount:
        (exp * SKILL_CORE_PIECE_COST) / REINFORCE_CORE_PIECE / CORE_EXP,
      neededExpCoreAmount: exp / EXP_CORE_EXP,
    };
  } else {
    return {
      neededExp: exp,
      needed1LvCoreAmount: exp / CORE_EXP,
      averageNeededCoreAmount: (exp * 2) / 45,
      maxNeededCoreAmount:
        (exp * SKILL_CORE_PIECE_COST) / REINFORCE_CORE_PIECE / CORE_EXP,
      neededExpCoreAmount: exp / EXP_CORE_EXP,
    };
  }
}

CoreExpCalculator.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CoreExpCalculator;
