import { Icon } from "@/lib/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function MainView({
  data: parent,
  handleOptionSelected,
  selectedOptions,
  setCurrentOption,
}: any) {
  const ActionButtons = ({ item, type }: any) => (
    <div className="flex space-x-4 py-1.5">
      {/* <div
        className="p-1 rounded-sm hover:bg-background"
        onClick={() =>
          console.log({ currentData: item, parentData: parent, type })
        }
      >
        <Icon name="Eye" className="h-4 w-4" />
      </div> */}
      <div
        className="p-1 rounded-sm hover:bg-background"
        onClick={() => setCurrentOption({ parent, selectedData: item })}
      >
        <Icon name="Settings" className="h-4 w-4" />
      </div>
    </div>
  );

  const OptionType = ({ type, item }: any) => {
    const checked =
      !!selectedOptions?.[parent?.id] &&
      !!selectedOptions?.[parent?.id]?.[item?.id];

    switch (type) {
      case "radio":
        return (
          <RadioGroupItem
            value={item?.id}
            id={item?.id}
            className="mt-1.5"
            checked={checked}
            onClick={() =>
              handleOptionSelected({ type, selectedData: item, parent })
            }
          />
        );
      case "check":
        return (
          <Checkbox
            value={item?.id}
            id={item?.id}
            className="mt-1.5"
            checked={checked}
            onClick={() =>
              handleOptionSelected({ type, selectedData: item, parent })
            }
          />
        );
      default:
        return null;
    }
  };

  const OptionFields = ({ item }: any) => {
    if (item?.isCombined) {
      return (
        <div className="flex flex-col w-full">
          <Label htmlFor={item?.id} className="text-lg">
            {item?.description}
          </Label>{" "}
          {renderComponent(item)}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col w-full">
          <OptionDetails item={item} />
          {item?.isMultipleDetails && (
            <div className="space-y-4 mt-4">
              {item?.details?.map((detail: any) => (
                <SubOptionFields key={detail?.id} detail={detail} />
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  const OptionItem = ({ item, type }: any) => {
    const checked =
      !!selectedOptions?.[parent?.id] &&
      !!selectedOptions?.[parent?.id]?.[item?.id];

    return (
      <div className="p-2">
        <div className="flex items-start gap-4 justify-between hover:bg-muted hover:rounded-sm cursor-pointer w-full p-2">
          <div className="flex gap-4 w-full rounded-md">
            <OptionType type={type} item={item} />
            <OptionFields item={item} />
          </div>
          {checked && <ActionButtons item={item} type={type} />}
        </div>
      </div>
    );
  };

  const OptionComponent = ({ data }: any) => {
    return (
      <div className="divide-y divide w-full">
        {data?.options?.map((item: any) => (
          <OptionItem key={item?.id} item={item} type={data?.component} />
        ))}
      </div>
    );
  };

  const OptionDetails = ({ item }: any) => {
    return (
      <div className="w-full space-y-2">
        <Label htmlFor={item?.id} className="text-lg">
          {item?.name}
        </Label>
        <div className="flex">
          <Icon name={item?.icon} className="h-4 w-4 mr-2" />
          <p className="opacity-50 text-sm">{item?.description}</p>
        </div>
      </div>
    );
  };

  const SubOptionFields = ({ detail }: any) => {
    return (
      <div className="flex gap-2 items-start hover:bg-background hover:rounded-sm  p-2">
        <Icon name="Aperture" className="h-4 w-4 mr-2 mt-1" />
        <OptionDetails item={detail} />
      </div>
    );
  };

  const renderComponent = (data: any) => {
    switch (data?.component) {
      case "radio":
        return (
          <RadioGroup>
            <OptionComponent data={data} />
          </RadioGroup>
        );
      case "check":
        return <OptionComponent data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center w-full">{renderComponent(parent)}</div>
  );
}
