import * as DropdownMenu from 'zeego/dropdown-menu'
import RoundButton from './RoundButton'

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={'ellipsis-horizontal'} title="More" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item textValue="Statements" key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: 'list.bullet.rectangle.fill', pointSize: 24 }}
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item textValue="Converter" key="converter">
          <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: 'coloncurrencysign.arrow.circlepath', pointSize: 24 }}
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item textValue="Background" key="background">
          <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon ios={{ name: 'photo.fill', pointSize: 24 }} />
        </DropdownMenu.Item>
        <DropdownMenu.Item textValue="New Account" key="account">
          <DropdownMenu.ItemTitle>New Account</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: 'plus.rectangle.fill.on.folder.fill', pointSize: 24 }}
          />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default Dropdown
