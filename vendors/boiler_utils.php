<?php
function script_loader($path)
{
    foreach (glob($path) as $filename) { // all paths found
            echo '<script type="text/javascript" src="'.$filename.'">';
            //echo file_get_contents($filename);
            echo '</script>'."\n";
    }
}

function template_loader($path)
{
    foreach (glob($path) as $filename) { // all paths found
            $template_file = basename($filename); // file name
            $template_name = substr($template_file, 0, strpos($template_file,'.')); // first name before dot
//            echo '<!-- '.$filename.' -->'."\n";
            echo '<script id="template_'.$template_name.'" type="text/html">'."\n";
            echo file_get_contents($filename)."\n";
            echo '</script>'."\n";
    }
}
