import QtQuick
import Quickshell
import qs.Ui

BarWidget {
  id: root
  moduleName: "io.github.virajshoor.story-keys"

  // Resolve the launcher from the installed plugin folder, so this works
  // both from the development checkout and from `omarchy plugin add`.
  readonly property string launcherPath: decodeURIComponent(
    Qt.resolvedUrl("launch.sh").toString().replace(/^file:\/\//, "")
  )

  implicitWidth: button.implicitWidth
  implicitHeight: button.implicitHeight

  function launchStoryKeys() {
    Quickshell.execDetached(["uwsm-app", "--", root.launcherPath])
  }

  WidgetButton {
    id: button
    anchors.fill: parent
    bar: root.bar
    text: "⌨"
    tooltipText: "Open Story Keys"
    onPressed: function(buttonCode) {
      if (buttonCode === Qt.LeftButton) root.launchStoryKeys()
    }
  }
}
